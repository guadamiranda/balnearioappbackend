import { createClient, SupabaseClient} from '@supabase/supabase-js'
import { IRepositoryConnection } from './repository-connection';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseConnection implements IRepositoryConnection {
    private supaBaseInstance: SupabaseClient;

    constructor() {}

    createConnection() {
        // Pasarlo a process.env
        const SUPABASE_URL = 'https://jspoxwwlieygrlzrdvmg.supabase.co'
        const PUBLIC_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcG94d3dsaWV5Z3JsenJkdm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NDg4ODgsImV4cCI6MjAwNDQyNDg4OH0.S4uIzebCNaYCTwZXbI0huQZmhn3P8kA07NhKtqu6e5o'
        try {
            this.supaBaseInstance = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);
            console.log('Conexion con SupaBase completada')
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    getConnection () {
        if(!this.supaBaseInstance) this.createConnection();
        return this.supaBaseInstance;
    }
}