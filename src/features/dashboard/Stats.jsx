import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';

import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings = [], confirmedStays = [], numDays = 0, cabinCount = 0 }) {
	const numBookings = bookings.length;

	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	const checkIns = confirmedStays.length;

	const occupancyRate = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

	return (
		<>
			<Stat
				title='bookings'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title='sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={ formatCurrency(sales) }
			/>
			<Stat
				title='check-ins'
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkIns}
			/>
			<Stat
				title='occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={(occupancyRate * 100).toFixed(1) + '%'}
			/>
		</>
	);
}

export default Stats;