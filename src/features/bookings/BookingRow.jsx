import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";

import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: "Sono";
`;

const Stacked = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.2rem;

   & span:first-child {
      font-weight: 500;
   }

   & span:last-child {
      color: var(--color-grey-500);
      font-size: 1.2rem;
   }
`;

const Amount = styled.div`
   font-family: "Sono";
   font-weight: 500;
`;

function BookingRow({
   booking: {
      id: bookingID,
      // created_at,
      startDate,
      endDate,
      numNights,
      // numGuests,
      totalPrice,
      status,
      guests: { fullName: guestName, email },
      cabins: { name: cabinName },
   },
}) {
   const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
   };

   const navigate = useNavigate();

   const { checkOut, isCheckingOut } = useCheckOut();

   const { deleteBooking, isDeleting } = useDeleteBooking();

   return (
      <Table.Row>
         <Cabin>{cabinName}</Cabin>

         <Stacked>
            <span>{guestName}</span>
            <span>{email}</span>
         </Stacked>

         <Stacked>
         <span>
            {isToday(new Date(startDate))
               ? "Today"
               : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
         </span>
         <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
         </span>
         </Stacked>

         <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

         <Amount>{formatCurrency(totalPrice)}</Amount>

         <Modal>
            <Menus.Menu>
               <Menus.Toggle id={bookingID} />
               <Menus.List id={bookingID}>
                  <Menus.Button
                     icon={<HiEye />}
                     onClick={() => navigate(`/bookings/${bookingID}`)}
                  >See details</Menus.Button>

                  { status === 'unconfirmed' &&
                     <Menus.Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/check-in/${bookingID}`)}
                     >Check in</Menus.Button>
                  }

                  { status === 'checked-in' &&
                     <Menus.Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkOut(bookingID)}
                        disabled={isCheckingOut}
                     >Check out</Menus.Button>
                  }

                  <Modal.Open opens='delete'>
                     <Menus.Button
                        icon={<HiTrash />}
                     >Delete</Menus.Button>
                  </Modal.Open>
               </Menus.List>
            </Menus.Menu>

            <Modal.Window name='delete'>
               <ConfirmDelete
                  resourceName='booking'
                  onConfirm={() => deleteBooking(bookingID)}
                  disabled={isDeleting}
               />
            </Modal.Window>
         </Modal>
      </Table.Row>
   );
}

BookingRow.propTypes = {
   booking: PropTypes.object,
};

export default BookingRow;