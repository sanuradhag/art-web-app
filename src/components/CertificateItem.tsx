import { useNavigate } from 'react-router-dom';

import { Certificate } from "../interfaces/certificate";
import Facebook from "../images/facebook-logo.svg";
import Instagram from "../images/instagram-logo.svg";
import Twitter from "../images/twitter-logo.svg";
import Trash from "../images/trash.svg";

const CertificateItem = ({
	certificate,
	onDelete,
}: CertificateItemProps): JSX.Element => {
	const { title, imageUrl, artistFirstName, artistLastName, year } =certificate;

	const navigate = useNavigate();

	const handleImageClick = () => {
    navigate(`/update/${certificate.id}`)
	}

	return (
		<div className="h-70 w-60 mx-3 my-6  cursor-pointer relative">
			<div className="group">
				<img
					src={imageUrl}
					alt="certificate-img"
					className="group rounded transition ease-in-out duration-200 hover:scale-125 shadow-xl"
					onClick={handleImageClick}
				/>
				<div
					onClick={(e) => onDelete(certificate.id!)}
					className="absolute -top-5 -right-5 opacity-0 group-hover:opacity-100  transition ease-in-out duration-200  h-7 w-7  flex items-center justify-center cursor-pointer"
				>
					<img src={Trash} alt="trash" className="h-6 cursor-pointer " />
				</div>
			</div>

			<div className="group">
				<div className="details text-center h-16">
					<div className="text-lg my-2 font-thin">{title}</div>
					<div className="my-2 text-sm">
						{artistFirstName}&nbsp;{artistLastName} - {year}
					</div>
				</div>
				<div className="flex justify-around items-center opacity-0 group-hover:opacity-100">
					<img src={Facebook} alt="fb" className="h-4 cursor-pointer" />
					<img src={Instagram} alt="instagram" className="h-5 cursor-pointer" />
					<img src={Twitter} alt="twitter" className="h-4 cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

interface CertificateItemProps {
	certificate: Certificate;
	onDelete: (id: string) => void;
}

export default CertificateItem;
