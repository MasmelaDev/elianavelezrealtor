import { d as db, a as availabilitySlots, l as leads, b as appointments } from '../../chunks/schema_CP1qSdhM.mjs';
import { A as AppointmentSchema } from '../../chunks/index_BTv1RK1A.mjs';
import { s as sendAppointmentToClient, n as notifyRealtorAppointment } from '../../chunks/email_BQBaStOK.mjs';
import { getTokenFromCookies, verifyToken } from '../../chunks/auth_M1WJu4vt.mjs';
import { eq, desc, and } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const GET = async ({ cookies }) => {
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await db.select({
      id: appointments.id,
      status: appointments.status,
      notes: appointments.notes,
      createdAt: appointments.createdAt,
      leadName: leads.name,
      leadEmail: leads.email,
      leadPhone: leads.phone,
      slotDate: availabilitySlots.date,
      slotTimeStart: availabilitySlots.timeStart,
      slotTimeEnd: availabilitySlots.timeEnd
    }).from(appointments).innerJoin(leads, eq(appointments.leadId, leads.id)).innerJoin(availabilitySlots, eq(appointments.slotId, availabilitySlots.id)).orderBy(desc(appointments.createdAt));
    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = AppointmentSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    const result = await db.transaction(async (tx) => {
      const [slot2] = await tx.select().from(availabilitySlots).where(and(eq(availabilitySlots.id, parsed.data.slotId), eq(availabilitySlots.isBooked, false))).limit(1);
      if (!slot2) return null;
      const [lead] = await tx.insert(leads).values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message ?? null,
        source: "appointment"
      }).returning();
      const [appointment2] = await tx.insert(appointments).values({
        leadId: lead.id,
        slotId: parsed.data.slotId,
        status: "pending"
      }).returning();
      await tx.update(availabilitySlots).set({ isBooked: true }).where(eq(availabilitySlots.id, parsed.data.slotId));
      return { slot: slot2, lead, appointment: appointment2 };
    });
    if (!result) {
      return Response.json({ error: "Slot not found or already booked" }, { status: 409 });
    }
    const { slot, appointment } = result;
    const dateStr = typeof slot.date === "string" ? slot.date : slot.date.toISOString().slice(0, 10);
    const timeStart = typeof slot.timeStart === "string" ? slot.timeStart : String(slot.timeStart).slice(0, 5);
    try {
      await sendAppointmentToClient({
        to: parsed.data.email,
        name: parsed.data.name,
        date: dateStr,
        timeStart
      });
      await notifyRealtorAppointment({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        date: dateStr,
        timeStart,
        message: parsed.data.message
      });
    } catch {
    }
    return Response.json({
      success: true,
      appointment: { id: appointment.id, date: dateStr, timeStart }
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
