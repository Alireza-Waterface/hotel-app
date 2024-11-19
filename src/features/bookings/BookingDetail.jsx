import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from '../../ui/Modal';
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

import useMoveBack from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import useDeleteBooking from "./useDeleteBooking";
import useCheckOut from "../check-in-out/useCheckOut";

import { useNavigate } from "react-router-dom";

import { HiArrowUpOnSquare } from "react-icons/hi2";

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
`;

function BookingDetail() {
   const { booking, isLoading } = useBooking();

   const moveBack = useMoveBack();

   const navigate = useNavigate();

   const { checkOut, isCheckingOut } = useCheckOut();

   const { deleteBooking, isDeleting } = useDeleteBooking();

   if (isLoading) return <Spinner />;

   if(!booking) return <Empty resource='Booking' />
   
   const { status, id: bookingID } = booking;

   const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
   };

   return (
      <>
         <Row type="horizontal">
            <HeadingGroup>
               <Heading as="h1">Booking #{bookingID}</Heading>
               <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         <ButtonGroup>
            { status === 'unconfirmed' &&
               <Button
                  onClick={() => navigate(`/check-in/${bookingID}`)}
               >Check in</Button>
            }

            { status === 'checked-in' &&
               <Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkOut(bookingID)}
                  disabled={isCheckingOut}
               >{ isCheckingOut ? 'Checking-out...' : 'Check-out' }</Button>
            }

            <Modal>
               <Modal.Open opens='delete'>
                  <Button variation='danger'>Delete booking</Button>
               </Modal.Open>

               <Modal.Window name='delete'>
                  <ConfirmDelete
                     resourceName='booking'
                     onConfirm={() => deleteBooking(bookingID, { onSettled: () => navigate(-1) })}
                     disabled={isDeleting}
                  />
               </Modal.Window>
            </Modal>

            <Button variation="secondary" onClick={moveBack}>Back</Button>
         </ButtonGroup>
      </>
   );
}

export default BookingDetail;