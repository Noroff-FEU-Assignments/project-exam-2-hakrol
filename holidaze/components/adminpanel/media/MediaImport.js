import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import PropTypes from "prop-types";

export default function MediaImport( {register} ) {
    const [media, setMedia] = useState([]);

	const http = useAxios();

    useEffect(function () {
		async function getMedia() {
			try {
				const response = await http.get("/places");
				console.log("response", response);
				setMedia(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		getMedia();
    }, []);

    return (
		<select name="featured_media" ref={register}>
			<option value="">Select media</option>
			{media.map((media) => {
				return (
					<option key={media.id} value={media.id}>
						{media.title}
					</option>
				);
			})}
		</select>
	);
}

MediaImport.propTypes = {
	register: PropTypes.func,
};

MediaImport.defaultProps = {
	register: () => {},
};