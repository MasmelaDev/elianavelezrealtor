import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialogRef.current?.close()
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Usamos el <dialog> nativo de HTML5 con backdrop backdrop:bg-black/50
  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 rounded-lg shadow-xl open:animate-in open:fade-in-90 open:zoom-in-95"
    >
      <div className="flex flex-col max-h-[90vh] w-full max-w-lg bg-white sm:rounded-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 opacity-70 hover:bg-gray-100 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </dialog>,
    document.body
  )
}
