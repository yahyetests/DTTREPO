require 'stripe'
require 'sinatra'

# This is your test secret API key.
Stripe.api_key = 'sk_test_51SbDhTH8JpK5JEfw4ipqfE2H2VZ3n14NPe7PXeXjK7sryVXKxaI0JOKqW0QyqG92VNu2CIAkF41kJptu8jAQPpUa00zChVo7Gy'
Stripe.api_version = '2026-01-28.clover'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'http://localhost:4242'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    ui_mode: 'custom',
    line_items: [{
      # Provide the exact Price ID (for example, price_1234) of the product you want to sell
      price: '{{PRICE_ID}}',
      quantity: 1,
    }],
    mode: 'payment',
    return_url: YOUR_DOMAIN + '/complete.html?session_id={CHECKOUT_SESSION_ID}',
    automatic_tax: {enabled: true},
  })

  { clientSecret: session.client_secret }.to_json
end

get '/session-status' do
  session = Stripe::Checkout::Session.retrieve({id: params[:session_id], expand: ["payment_intent"]})

  { status: session.status, payment_status: session.payment_status, payment_intent_id: session.payment_intent.id, payment_intent_status: session.payment_intent.status }.to_json
end