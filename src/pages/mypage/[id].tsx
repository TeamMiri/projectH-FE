import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { MyPageProfile } from '@/sections/myPage/profile/index';
import MyPageBody from '@/sections/myPage/body';
import { useRecoilState } from 'recoil';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { myPageUserAtom } from '@/atoms/userAtom';
import { User } from '@/models/User';
import { getUserInfo } from '@/utils/userInfoAPI';
import styled from 'styled-components';

export default function Mypage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isLogined } = useAuth();

  const [userBasicInfo, setUserBasicInfo] =
    useRecoilState<User>(myPageUserAtom);
  useEffect(() => {
    setUserBasicInfo(props);
  }, [props, setUserBasicInfo]);

  return (
    <>
      {isLogined ? (
        <MypageContainer>
          <MyPageProfile
            name={userBasicInfo.name ?? props.email}
            email={userBasicInfo.email ?? props.email}
            profileImgUrl={
              userBasicInfo.profileImageUrl ?? props.profileImageUrl
            }
            techStack={userBasicInfo.techSpec ?? props.techSpec}
            age={userBasicInfo.age ?? '1'}
            sex={userBasicInfo.gender ?? 'M'}
            pn={userBasicInfo.contactNumber ?? '11111111111'}
            offline={userBasicInfo.location ?? ['ㅁㄴㅇㄹ', 'ㅇㄹ']}
            introduce={userBasicInfo.introduction ?? props.introduction}
            id={userBasicInfo.userId ?? props.userId}
          />
          <MyPageBody Projs={['tmp', 'tmp']} _id={userBasicInfo.userId} />
        </MypageContainer>
      ) : (
        <>로그인해주세요</>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<User> = async context => {
  if (context.params === undefined) {
    return {
      notFound: true,
    };
  }
  const token = context.req.headers.cookie?.split('=')[1];
  if (!token) {
    return {
      notFound: true,
    };
  }
  const res = await getUserInfo(context.params.id as string, token);
  if (!res || res.status === 404) {
    return {
      notFound: true,
    };
  }
  return {
    props: res.data.body.user,
  };
};

const MypageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  height: auto;
`;
