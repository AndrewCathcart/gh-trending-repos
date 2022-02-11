import FavouritesList from '@components/FavouritesList';
import Layout from '@components/Layout';

const Favourites = () => {
  return (
    <Layout title="Favourites">
      <div className="flex flex-col items-stretch max-w-4xl mx-auto my-4">
        <h1 className="pb-4 text-2xl font-extrabold ">View your favourites below...</h1>
        <FavouritesList />
      </div>
    </Layout>
  );
};

export default Favourites;
