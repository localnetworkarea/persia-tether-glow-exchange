
import * as z from "zod";

// Login form schema
export const loginSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Register form schema
export const registerSchema = z.object({
  fullName: z.string().min(2, "نام کامل باید حداقل 2 کاراکتر باشد"),
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
  confirmPassword: z.string().min(6, "تأیید رمز عبور باید حداقل 6 کاراکتر باشد"),
}).refine(data => data.password === data.confirmPassword, {
  message: "رمز عبور و تأیید آن مطابقت ندارند",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
