import { create } from 'zustand';

const useStore = create((set) => ({
    filters: {
        username: '',
        title: '',
        dateFrom: '',
        dateTo: '',
        useUsername: false,
        useTitle: false,
        useDate: false,
    },
    setFilter: (name, value) => set((state) => ({
        filters: { ...state.filters, [name]: value }
    })),

    fav: 0,
    setFav: (fav) => set({ fav }),
}));

export default useStore;
