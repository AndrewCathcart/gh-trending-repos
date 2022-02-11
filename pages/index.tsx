import Layout from '@components/Layout';
import RepoCardList from '@components/RepoCardList';

const Index = () => {
  return (
    <Layout title="What's Trending?">
      <div className="flex flex-col items-stretch max-w-4xl mx-auto my-4">
        <h1 className="mb-2 text-2xl font-extrabold ">
          Explore some of the most popular GitHub repositories in the past week below...
        </h1>
        <RepoCardList />
      </div>
    </Layout>
  );
};

export default Index;
