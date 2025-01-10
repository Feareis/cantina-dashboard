import { supabase } from './supabaseClient';

export const addEmployee = async (employee: { first_name: string; last_name: string; phone: string; grade: string; hire_date: string }) => {
  const { data, error } = await supabase
    .from('employees')
    .insert([employee]);
  if (error) throw error;
  return data;
};

export const getEmployees = async () => {
  const { data, error } = await supabase.from('employees').select('*');
  console.log('Fetched data:', data);
  console.error('Error:', error);
  if (error) {
    throw error;
  }
  return data;
};

export const updateEmployee = async (id: string, updates: { first_name?: string; last_name?: string; phone?: string; grade?: string; hire_date?: string }) => {
  const { data, error } = await supabase
    .from('employees')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteEmployee = async (id: string) => {
  const { data, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};
