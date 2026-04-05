import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fvefcdhbpsqjswcscksp.supabase.co';
const supabaseKey = 'sb_publishable_hZ3QbV7SAGTWDzWF1Ru_eA_fUg_3SyK';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    console.log('Testing Registration...');
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'TestPassword123!';

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name: 'Test User', role: 'STUDENT' }
        }
    });

    if (signUpError) {
        console.error('Registration failed:', signUpError.message);
        return;
    }

    console.log('Registration successful:', signUpData.user?.id);

    console.log('Testing Login...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        console.error('Login failed:', signInError.message);
        return;
    }

    console.log('Login successful:', signInData.user?.id);
}

testAuth();
