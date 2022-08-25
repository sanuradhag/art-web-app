import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Certificate } from "../interfaces/certificate";

const CertificateForm = (props: CertificateFormProps): JSX.Element => {
	const { certificate, onSubmit } = props;

	const [title, setTitle] = useState<string>("");
	const [artistFirstName, setArtistFirstName] = useState<string>("");
	const [artistLastName, setArtistLastName] = useState<string>("");
	const [year, setYear] = useState<number>(2000);
	const [imageUrl, setImageUrl] = useState<string>("");
	const [hasError, setHasError] = useState<boolean>(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!title || !artistFirstName || !artistLastName || !year || !imageUrl) {
			setHasError(true);
		} else {
			setHasError(false);
			const data: Certificate = {
				id: certificate?.id
					? certificate.id
					: `${Math.floor(Math.random() * 1000)}`,
				title,
				artistFirstName,
				artistLastName,
				year,
				imageUrl: `https://picsum.photos/500/500?random=${Math.floor(
					Math.random() * 100
				)}`,
			};
			onSubmit(data);
		}
	};

	useEffect(() => {
		if (certificate) {
			setTitle(certificate.title);
			setArtistFirstName(certificate.artistFirstName);
			setArtistLastName(certificate.artistLastName);
			setYear(certificate.year);
			setImageUrl(certificate.imageUrl);
		}
	}, [certificate]);

	return (
		<div className="flex flex-col items-center justify-between h-full">
			<div className="text-3xl font-bold text-center p-10">
				{certificate ? "Edit certificate" : "Add a new certificate"}
			</div>

			<form className="w-6/12 h-full flex flex-col" onSubmit={handleSubmit}>
				<label className="text-lg mr-5">
					Title <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="border-2 border-gray-500 mb-6 pl-4"
					value={title}
					onChange={(e) => {
						console.log(title);
						setTitle(e.target.value);
					}}
				/>

				<label className="text-lg mr-5">
					Artist First Name<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="border-2 border-gray-500 mb-6 pl-4"
					value={artistFirstName}
					onChange={(e) => {
						setArtistFirstName(e.target.value);
					}}
				/>

				<label className="text-lg mr-5">
					Artist Last Name<span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="border-2 border-gray-500 mb-6 pl-4"
					value={artistLastName}
					onChange={(e) => {
						setArtistLastName(e.target.value);
					}}
				/>

				<label className="text-lg mr-5">
					Year <span className="text-red-500">*</span>
				</label>
				<input
					type="number"
					className="border-2 border-gray-500 mb-6 pl-4"
					value={year}
					onChange={(e) => {
						setYear(Number(e.target.value));
					}}
				/>

				<label className="text-lg mr-5">
					Image URl <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					className="border-2 border-gray-500 mb-6 pl-4"
					value={imageUrl}
					onChange={(e) => {
						setImageUrl(e.target.value);
					}}
				/>

				{hasError && (
					<span className="text-red-500">Fill all the required details</span>
				)}

				<div className="flex w-full items-center justify-between">
					<button
						className="h-10 w-full bg-black text-white font-bold"
						type="submit"
					>
						{certificate ? "Update" : "Add"}
					</button>
					<Link to={"/"} className='w-full ml-4'>
						<div className="h-10 w-full bg-white text-black font-bold border-2 border-black text-center leading-9">
							Cancel
						</div>
					</Link>
				</div>
			</form>
		</div>
	);
};

interface CertificateFormProps {
	certificate: Certificate | undefined;
	onSubmit: (certificate: Certificate) => void;
}

export default CertificateForm;
