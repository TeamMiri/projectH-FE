import Image from 'next/image';
import styled from 'styled-components';
import { Pill } from '@/components/Pill/Pill';
import { ModalButton } from '@/components/ModalContainer/ModalButton';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/userAtom';
import { MyInfoForm } from '@/components/MyInfoForm/MyInfoForm';
import { ProjectInterface } from '@/models/ProjectModel';

export function MyPageProfile(props: ProjectInterface) {
  const userData = useRecoilValue(userAtom);
  const isMyPage = userData.name === props.ownerName;
  return (
    <>
      <ProfileContainer>
        <NextImage
          src={props.pictureURL}
          alt="/testdoge.jpg"
          width={300}
          height={200}
        />
        <Body>
          <div>프로젝트명 : {props.projectName}</div>
          <div>프로젝트 오너 : {props.ownerName}</div>
          <div>오프라인 참석 여부: {props.offlineTask}</div>
          <PillContainer>
            {props.techSpec.map(value => {
              return <Pill name={value} key={value} />;
            })}
          </PillContainer>
          {isMyPage ? (
            <ModalButton
              variant="primary"
              size="sm"
              modalTitle="프로젝트 정보 수정"
              buttonTitle="프로젝트 정보 수정하기"
            >
              <MyInfoForm />
            </ModalButton>
          ) : (
            <div>내가 만든 프로젝트가 아닙니다.</div>
          )}
        </Body>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  @media ${({ theme }) => theme.responsive.mobile} {
    flex-direction: column;
    color: red;
  }
  justify-content: center;
  align-items: center;
`;
const NextImage = styled(Image)`
  width: 250px;
  height: 250px;
  margin-right: 3rem;
  @media ${({ theme }) => theme.responsive.mobile} {
    width: 95vw;
    height: auto;
    margin-top: 1rem;
    margin-right: 0;
    height: auto;
  }
  object-fit: cover;
`;
const Body = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
`;
