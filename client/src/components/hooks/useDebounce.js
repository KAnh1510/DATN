import { useEffect, useState } from "react";

function useDebounce(value, delay) {
	const [debounceValue, setUseDebounce] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setUseDebounce(value), delay);

		return () => clearTimeout(handler);
	}, [value]);
	return debounceValue;
}

export default useDebounce;
