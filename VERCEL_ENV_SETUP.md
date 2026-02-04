# Setting Environment Variables in Vercel

## Problem

EmailJS works locally but shows "EmailJS is not configured" error in Vercel.

## Solution

Environment variables from `.env` file are not automatically available in Vercel. You need to add them manually in Vercel dashboard.

## Steps to Add Environment Variables in Vercel

1. **Go to your Vercel project dashboard**

   - Visit https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**

   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add the following environment variables:**

   | Variable Name                      | Value               |
   | ---------------------------------- | ------------------- |
   | `VITE_EMAILJS_PUBLIC_KEY`          | `dHwqTwGg-uzPAVPWN` |
   | `VITE_EMAILJS_SERVICE_ID`          | `service_9et634w`   |
   | `VITE_EMAILJS_ORDER_TEMPLATE_ID`   | `template_f2mkb9g`  |
   | `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | `template_pou7v88`  |

4. **Set Environment Scope**

   - For each variable, select:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - This ensures variables work in all environments

5. **Redeploy**
   - After adding variables, go to **Deployments** tab
   - Click **⋯** (three dots) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger automatic deployment

## Important Notes

- ⚠️ **Never commit `.env` file** - it's already in `.gitignore`
- ✅ Environment variables are encrypted in Vercel
- ✅ After adding variables, you MUST redeploy for changes to take effect
- ✅ Variables starting with `VITE_` are exposed to the browser (this is expected for EmailJS)

## Verification

After redeploying, test:

1. Go to checkout page
2. Fill the form and submit
3. Email should be sent successfully without errors

## Troubleshooting

If still not working:

1. Check variable names match exactly (case-sensitive)
2. Ensure all 4 variables are added
3. Verify redeployment completed successfully
4. Check browser console for any errors
5. Verify EmailJS credentials are still valid
