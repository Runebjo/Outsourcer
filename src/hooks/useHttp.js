import { useEffect, useState } from 'react';
import axios from 'axios';

export function useHttp(url) {
	const [state, setState] = useState({ data: null, loading: true });

	useEffect(() => {
		setState(state => ({ data: state.data, loading: true }));
		async function getOutline() {
			try {
				const outline = (await axios.get(url)).data;
				setState(state => ({ data: outline, loading: false }));
				//form.setFieldsValue(outline);
			} catch (error) {
				//message.error('Failed to get template');
				setState(state => ({ data: null, loading: false }));
				console.log(error);
			}
		}

		getOutline();
	}, [url]);

	return state;
}
