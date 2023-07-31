import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import { connect } from 'mongoose'

export const Page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [display_name, setDisplayName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    try {
      // 認証情報を取得
      const auth = getAuth()

      // ユーザー情報を作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )



      // メールに認証URLを送信
      await sendEmailVerification(userCredential.user)

      // フォームの値を空にする
      setEmail('')
      setPassword('')
      setDisplayName('')

      // アラートを送信する
      toast({
        title: '確認メールを送信しました。',
        status: 'success',
        position: 'top',
      })

      // リダイレクト
      push((path) => path.chat.$url())
    } catch (e) {
      // エラーのアラートを送信
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })

      // Firebaseのエラーだった場合はコンソールに表示
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      // 完了後ロードを終了する
      setIsLoading(false)
    }
  }

  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormControl>
            <Spacer height={12} aria-hidden />
            <FormControl>
              <FormLabel>表示名</FormLabel>
              <Input
                type={'display_name'}
                name={'display_name'}
                value={display_name}
                onChange={(e) => {
                  setDisplayName(e.target.value)
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'} isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default Page
