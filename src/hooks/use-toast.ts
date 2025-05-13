
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts: ToasterToast[] = []

type ToastOptions = Omit<ToasterToast, "id">

function toast(opts: ToastOptions) {
  const id = genId()

  const newToast = {
    ...opts,
    id,
  }

  toasts.push(newToast)

  return {
    id: id,
    dismiss: () => {
      toasts.splice(toasts.findIndex((toast) => toast.id === id), 1)
    },
    update: (props: ToastOptions) => {
      const index = toasts.findIndex((toast) => toast.id === id)
      if (index !== -1) {
        toasts[index] = { ...toasts[index], ...props }
      }
    },
  }
}

function useToast() {
  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        toasts.splice(toasts.findIndex((toast) => toast.id === toastId), 1)
      }
    },
  }
}

export { useToast, toast }
