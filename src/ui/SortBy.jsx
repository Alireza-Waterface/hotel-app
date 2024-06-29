import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from 'prop-types';

function SortBy({options}) {
	const [params, setParams] = useSearchParams();

	const sortBy = params.get('sortBy') || '';

	function handleChange(e) {
		params.set('sortBy', e.target.value);
		setParams(params);
	}

	return (
		<Select
			options={options}
			type='white'
			value={sortBy}
			onChange={handleChange}
		/>
	);
}

SortBy.propTypes = {
	options: PropTypes.array.isRequired,
};

export default SortBy;