import styled from "styled-components";
import { useEffect, useState } from "react";

import { formatCurrency } from "../../utils/helpers";

import BookingDataBox from "../bookings/BookingDataBox";

import useBooking from '../bookings/useBooking';
import useMoveBack from "../../hooks/useMoveBack";
import useCheckIn from "./useCheckIn";
import useSettings from '../settings/useSettings';

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from '../../ui/Spinner';

const Box = styled.div`
   background-color: var(--color-grey-0);
   border: 1px solid var(--color-grey-100);
   border-radius: var(--border-radius-md);
   padding: 2.4rem 4rem;
`;

function CheckInBooking() {
   const moveBack = useMoveBack();

   const { booking, isLoading: isLoadingBookings } = useBooking();

   const [confirmPaid, setConfirmPaid] = useState(false);
   const [breakfast, setBreakfast] = useState(false);

   useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

   const { checkIn, isCheckingIn } = useCheckIn();

   const { settings, isLoading: isLoadingSettings } = useSettings();

   if (isLoadingBookings || isLoadingSettings) return <Spinner />

   const {
      id: bookingId,
      guests,
      totalPrice,
      numGuests,
      hasBreakfast,
      numNights,
   } = booking;

   const breakfastPrice = settings?.breakfastPrice * numGuests * numNights;

   function handleCheckIn() {
      if (!confirmPaid) return;

      if (breakfast) {
         checkIn({bookingId, breakfast: {
            hasBreakfast: true,
            extrasPrice: breakfastPrice,
            totalPrice: totalPrice + breakfastPrice,
         }})
         setBreakfast(false);
      } else {
         checkIn({bookingId, breakfast: {}});
      }
   }

   return (
      <>
         <Row type="horizontal">
            <Heading as="h1">Check-in booking #{bookingId}</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         { !hasBreakfast &&
            <Box>
               <Checkbox
                  checked={breakfast}
                  onChange={() => {
                     if (breakfast && confirmPaid) {
                        setBreakfast(prev => !prev);
                     } else if (breakfast && booking?.isPaid) {
                        setConfirmPaid(true);
                        setBreakfast(prev => !prev);
                     } else {
                        setConfirmPaid(false);
                        setBreakfast(prev => !prev);
                     }                     
                  }}
                  id='breakfast'
               >Add breakfast for {formatCurrency(breakfastPrice)}</Checkbox>
            </Box>
         }

         <Box>
            <Checkbox
               checked={confirmPaid}
               onChange={() => setConfirmPaid(prev => !prev)}
               id='confirm'
               disabled={
                  isCheckingIn ? true :
                  !breakfast && booking?.isPaid ? true :
                  false
               }
            >
               {guests.fullName} has paid the cabin&apos;s price - {breakfast ? formatCurrency(totalPrice + breakfastPrice) : formatCurrency(totalPrice) }
            </Checkbox>
         </Box>

         <ButtonGroup>
            <Button
               onClick={handleCheckIn}
               disabled={
                  isCheckingIn ? true :
                  breakfast && confirmPaid ? false :
                  breakfast && !confirmPaid ? true :
                  confirmPaid && booking?.isPaid ? true :
                  confirmPaid && !booking?.isPaid ? false :
                  !confirmPaid && booking?.isPaid ? true :
                  !confirmPaid && !booking?.isPaid ? true :
                  false
               }
            >
               { !confirmPaid && !breakfast ? `Pay cabin's price` :
                  breakfast && !confirmPaid ? 'Pay whole price' :
                  !breakfast && confirmPaid && booking?.isPaid ? 'Already checked-in' :
                  breakfast && confirmPaid && booking?.isPaid ? 'Add breakfast' :
                  confirmPaid && !breakfast ? `Check-in booking #${bookingId}` :
                  `Check-in booking #${bookingId}`
               }
            </Button>
            <Button variation="secondary" onClick={moveBack}>
               Back
            </Button>
         </ButtonGroup>
      </>
   );
}

export default CheckInBooking;
