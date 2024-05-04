export type ItmeProps = {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: ItemPriceProps;
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
};

export type ItemPriceProps = {
  amount: string;
  currency: string;
};

export const getItemList = (): Promise<ItmeProps[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let {data}: {data: ItmeProps[]} = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
