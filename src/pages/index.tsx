/* eslint-disable no-nested-ternary */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

const message = 'Carregar mais';

interface DataProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ResponseDataProps {
  data: DataProps[];
  after: string;
}

export default function Home(): JSX.Element {
  const getImages = async ({
    pageParam = null,
  }): Promise<ResponseDataProps> => {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages,
    {
      getNextPageParam: lastPage => {
        const { after } = lastPage;

        if (after) {
          return after;
        }

        return null;
      },
    }
    // TODO AXIOS REQUEST WITH PARAM
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY

    // map e flat
    const pages = data?.pages.map(item => item);

    const dataPages = pages?.map(item => item.data).flat();

    return dataPages;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>

        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
