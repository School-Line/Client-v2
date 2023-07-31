import {
  Avatar,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { FirebaseError } from '@firebase/util'
import { getAuth, signOut } from 'firebase/auth'
import { Navigate } from '@src/component/Navigate/Navigate'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import Image from 'next/image'

export const Header = () => {
  const { user } = useAuthContext()
  const toast = useToast()
  const { push } = useRouter()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      })
      push((path) => path.signin.$url())
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Flex>
          <Navigate href={(path) => path.$url()}>
            <chakra.a
              _hover={{
                opacity: 0.8,
              }}
            >
              <Heading color={'white'}>SC LINE</Heading>
            </chakra.a>
          </Navigate>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Image
                  src={
                    'https://cdn.discordapp.com/avatars/1004365048887660655/23f7c312ade4bd6be2740f2c84791dc1.webp'
                  }
                  alt={'avatar'}
                  width={48}
                  height={48}
                ></Image>
              </MenuButton>
              <MenuList py={0}>
                <MenuItem>アカウント設定</MenuItem>
                <MenuItem onClick={handleSignOut} color={'red'}>
                  サインアウト
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Navigate href={(path) => path.signin.$url()}>
              <Button as={'a'} colorScheme={'teal'}>
                サインイン
              </Button>
            </Navigate>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
