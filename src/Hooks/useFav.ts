export const useFav = (key: string) => {
    const setItem = (fav: unknown) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(fav));
      } catch (err) {
        console.log(err);
      }
    };
    const getItem = () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (err) {
        console.log(err);
      }
    };
    return { setItem, getItem };
  };
  