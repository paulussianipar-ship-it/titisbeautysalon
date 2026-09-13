import { supabase } from '@/lib/supabase/client';

export type ServiceRecord = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};

export const getServices = async (): Promise<ServiceRecord[]> => {
    const { data, error } = await supabase
        .from('services')
        .select('id, name, description, image, price')
        .order('id');

    if (error) {
        throw new Error(`Unable to load services: ${error.message}`);
    }

    return (data || []) as ServiceRecord[];
};