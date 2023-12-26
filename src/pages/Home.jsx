import { Flex } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} p={4} h='100vh'>
      <Sidebar flex={{ base: 1, md: 'auto' }} mb={{ base: 4, md: 0 }} h='100vh'/>
      <Chat flex={1} />
    </Flex>
  );
};

export default Home;


