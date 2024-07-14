import Button from "../../ui/Button";
import SpinnerMini from '../../ui/SpinnerMini';

import useCheckOut from './useCheckOut';

function CheckOutButton({ bookingID }) {
   const { checkOut, isCheckingOut } = useCheckOut();

   return (
      <Button variation="primary" size="small" onClick={() => checkOut(bookingID)} disabled={isCheckingOut}>
         { isCheckingOut ? <SpinnerMini /> : 'Check-out' }
      </Button>
   );
}

export default CheckOutButton;