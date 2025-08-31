import { z } from 'zod';
export const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((v) => /[a-z]/.test(v), { message: 'Password must include a lowercase letter' })
  .refine((v) => /[A-Z]/.test(v), { message: 'Password must include an uppercase letter' })
  .refine((v) => /[0-9]/.test(v), { message: 'Password must include a number' })
  .refine((v) => /[^a-zA-Z0-9]/.test(v), { message: 'Password must include a special character' });

export function mwLog(name: string, data: Record<string, unknown>) {
  const theme = {
    labelBg: '#3c883e', // green header
    labelText: '#fff',
    bodyBg: '#000',
    bodyText: '#fff',
  };

  const labelCss = `
    background:${theme.labelBg};
    color:${theme.labelText};
    font-weight:bold;
    padding:2px 8px;
    border-radius:4px;
     margin-top:1rem;
  `;

  const bodyCss = `
    background:${theme.bodyBg};
    color:${theme.bodyText};
    border-radius:10px;
     padding:0.5rem;
     margin-top:1rem;
  `;

  // Format args as a single line
  const argsText = Object.entries(data)
    .map(([k, v]) => `${k}: ${String(JSON.stringify(v))}`)
    .join('   |   ');

  console.log(`%c✨ ${name} %c${argsText}`, labelCss, bodyCss);
}
