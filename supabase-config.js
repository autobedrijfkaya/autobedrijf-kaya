/* Supabase verbinding voor Autobedrijf Kaya */
const SUPABASE_URL = 'https://mxlrglnqtbcsssqqrbrf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bHJnbG5xdGJjc3NzcXFyYnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTg5MTMsImV4cCI6MjA5NDA5NDkxM30.LjTSI73stsZiul5CJg9CMuUUUPBJ7DUe7dmGzwQL0QI';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.sb = sb;

window.kayaApi = {
  async listCars(){
    const { data, error } = await sb.from('cars').select('*').order('created_at', { ascending: false });
    if(error){ console.error('listCars error', error); return []; }
    return (data || []).map(rowToCar);
  },
  async getCar(id){
    const { data, error } = await sb.from('cars').select('*').eq('id', id).single();
    if(error){ console.error('getCar error', error); return null; }
    return data ? rowToCar(data) : null;
  },
};

function rowToCar(r){
  return {
    id: r.id,
    merk: r.merk,
    model: r.model,
    uitvoering: r.uitvoering || '',
    prijs: r.prijs,
    jaar: r.jaar,
    brandstof: r.brandstof || '',
    km: r.km,
    transmissie: r.transmissie || '',
    kleur: r.kleur || '',
    omschrijving: r.omschrijving || '',
    images: Array.isArray(r.images) ? r.images : [],
    image: Array.isArray(r.images) && r.images.length ? r.images[0] : '',
    createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now(),
  };
}
