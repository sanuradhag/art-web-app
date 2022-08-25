/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { deleteCertificate, fetchCertificates } from "../api";

import { useDebounce } from "../hooks/useDebounce";
import { Certificate } from "../interfaces/certificate";
import CertificateItem from "./CertificateItem";
import Spinner from "./shared/Spinner";
import AZ from "../images/sort-a-z.svg";
import ZA from "../images/sort-z-a.svg";

const sortArray = (array: Certificate[]): Certificate[] => {
	return array.sort((a: Certificate, b: Certificate) => {
		if (a.artistLastName > b.artistLastName) {
			return 1;
		}
		if (a.artistLastName < b.artistLastName) {
			return -1;
		}
		return 0;
	});
};

const CertificateList = (): JSX.Element => {
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const [displayCertificates, setDisplayCertificates] = useState<Certificate[]>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [sorted, setSorted] = useState<boolean>(false);
	const debouncedSearchTerm: string = useDebounce<string>(searchText, 1200);

	const getCertificates = (): void => {
		setLoading(true);
		setTimeout(async () => {
			const data = await fetchCertificates();
			const sortedArray = sortArray(data);
			setCertificates(sortedArray);
			setDisplayCertificates(sortedArray);
			setSorted(true);
			setLoading(false);
		}, 1800);
	};

	const filterData = (): void => {
		if (!searchText) {
			setDisplayCertificates(certificates);
		} else {
			setDisplayCertificates(
				certificates.filter((certificate) =>
					certificate.title
						.toLocaleLowerCase()
						.includes(searchText.toLowerCase())
				)
			);
		}
	};

	const handleDelete = async (id: string): Promise<void> => {
		setLoading(true);
		await deleteCertificate(id);
		setLoading(false);
		await getCertificates();
	};

	const handleSortClick = (): void => {
		setDisplayCertificates(displayCertificates.reverse());
		setSorted(!sorted);
	};

	useEffect(() => {
		filterData();
	}, [debouncedSearchTerm]);

	useEffect(() => {
		getCertificates();
		return () => {
			setCertificates([]);
			setDisplayCertificates([]);
			setLoading(false);
			setSearchText("");
		};
	}, []);

	return (
		<div className="certificate-list-wrapper bg-slate-50">
			<div className="nav-bar flex justify-between items-center px-10 py-5 sticky top-0 z-50 shadow-lg relative">
				<div className="text-xl font-semibold pl-3">Your Certificates</div>
				<input
					className="w-96 h-10 border-2 border-gray-200 pl-5 text-black font-thin focus:outline-none mr-10"
					value={searchText}
					placeholder="Filter by title"
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<img
					src={sorted ? AZ : ZA}
					className="h-6 cursor-pointer"
					alt="sort"
					onClick={handleSortClick}
				/>
				<Link to="/add-new">
					<div className="leading-9 text-center text-black text-4xl font-semibold rounded-full border-2 border-black h-10 w-10 cursor-pointer hover:text-gray-500 hover:border-gray-500">
						+
					</div>
				</Link>
			</div>
			<div className="certificate-list w-screen h-[calc(100vh_-_5rem)] flex flex-wrap p-10 overflow-scroll">
				{!loading &&
					displayCertificates.map((certificate) => (
						<CertificateItem
							key={certificate.id}
							certificate={certificate}
							onDelete={handleDelete}
						/>
					))}
				{loading && <Spinner />}

				{displayCertificates.length === 0 && (
					<div className="text-center font-semibold text-2xl h-screen w-screen">
						No records to display
					</div>
				)}
			</div>
		</div>
	);
};

export default CertificateList;
