import { useState,useMemo,useCallback } from "react";

export default function useFilter<T>(items:T[],keys:(keyof T)[]) {
    const [query,setQuery]=useState('');
    
        const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setQuery(e.target.value);
        },
        []
        );

    const filteredItems = useMemo(()=>{
        if(!query){
            return items;
        }
        return items.filter(item=>{
            return keys.some(key=>{
                const value = item[key];
                if(typeof value === 'string' || typeof value === 'number'){
                    return value.toString().toLowerCase().includes(query.toLowerCase());
                }
                return false;
            });
        });
    },[items,query,keys]);

    return {filteredItems,query,handleSearch};
}