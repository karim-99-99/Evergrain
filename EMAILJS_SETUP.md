# EmailJS Setup Guide

This guide will help you set up EmailJS to receive emails from your website when customers place orders or send messages through the contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your Gmail account
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Templates

### Template 1: Order Confirmation

1. Go to **Email Templates** → **Create New Template**
2. Name it: "Order Confirmation" or "New Order"
3. Set **To Email**: `kareemkhamis2030@gmail.com`
4. Set **Subject**: `Evergrain - New Order`
5. In the template body, use these variables:

   ```
   Subject: {{subject}}

   {{message}}

   --- Customer Details ---
   Name: {{customer_name}}
   Phone: {{customer_phone}}
   Location: {{customer_location}}

   Order Total: {{order_total}}
   ```

6. Click **Save** and copy the **Template ID** (e.g., `template_xxxxxxx`)

### Template 2: Contact Form

1. Create another template: "Contact Form Message"
2. Set **To Email**: `kareemkhamis2030@gmail.com`
3. Set **Subject**: `{{subject}}`
4. In the template body:

   ```
   From: {{from_name}} ({{from_email}})

   {{message}}
   ```

5. Click **Save** and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** and copy it (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your EmailJS credentials:

   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_ORDER_TEMPLATE_ID=your_order_template_id_here
   VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id_here
   ```

3. Replace the placeholder values with your actual IDs from EmailJS

## Step 6: Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Test the checkout page:

   - Add items to cart
   - Go to checkout
   - Fill in the form and click "Confirm Order"
   - Check your Gmail inbox for the order email

3. Test the contact page:
   - Fill in the contact form
   - Click "Send Message"
   - Check your Gmail inbox for the message

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **"EmailJS is not configured" error?** Make sure your `.env` file exists and has all variables set
- **Template variables not working?** Make sure variable names match exactly (case-sensitive)
- **Rate limit errors?** Free tier allows 200 emails/month. Upgrade if needed.

## For Production (Vercel)

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all four EmailJS variables:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_ORDER_TEMPLATE_ID`
   - `VITE_EMAILJS_CONTACT_TEMPLATE_ID`
4. Redeploy your site

## Security Note

The Public Key is safe to expose in frontend code. EmailJS uses it to identify your account, but it doesn't grant access to your account or emails.
