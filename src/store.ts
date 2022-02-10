import create from "zustand";

type NotificationType = {
  type: "warning" | "error" | "success" | "";
  message: string;
};

type Store = {
  isLoggedIn: boolean;
  notifications: NotificationType[];
  cryptoAssets: any[];
  isCryptosLoading: boolean;
  selectedCrypto: any;
  currentPageNumber: number;
  prevPageNumber: number;
  setIsLoggedIn: (status: boolean) => void;
  setNotification: (notifications: NotificationType[]) => void;
  getCryptoAssets: (pageNumber: number) => void;
};

const useStore = create<Store>((set, get) => ({
  isLoggedIn: false,
  notifications: [],
  cryptoAssets: [],
  isCryptosLoading: false,
  selectedCrypto: null,
  currentPageNumber: 1,
  prevPageNumber: 0,
  setIsLoggedIn(status: boolean) {
    set((state) => ({
      ...state,
      isLoggedIn: status,
    }));
  },
  setNotification(notifications: NotificationType[]) {
    set((state) => ({
      ...state,
      notifications,
    }));
  },
  getCryptoAssets: async (pageNumber: number) => {
    const prev = get().prevPageNumber;
    if (prev === pageNumber) {
      return;
    }
    const response = await fetch(
      `https://data.messari.io/api/v2/assets?fields=id,name,symbol,metrics/market_data/price_usd,metrics/marketcap/rank,metrics/marketcap/current_marketcap_usd&page=${pageNumber}`
    );
    set({
      isCryptosLoading: true,
      prevPageNumber: pageNumber,
      currentPageNumber: pageNumber,
    });
    const data = await response.json();
    const cyptos = await data.data;
    setTimeout(() => {
      set((state) => ({
        ...state,
        cryptoAssets: [...state.cryptoAssets, ...cyptos],
        isCryptosLoading: false,
      }));
    }, 2000);
  },
}));

export default useStore;
