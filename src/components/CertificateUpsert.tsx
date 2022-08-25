/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { addNewCertificate, fetchCertificateById, updateCertificate } from "../api";
import CertificateForm from "./CertificateForm";
import { Certificate } from "../interfaces/certificate";

const CertificateUpsert = (): JSX.Element => {
	const [certificate, setCertificate] = useState<Certificate>();

	const params = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (data: Certificate): Promise<void> => {
		if (certificate) {
			await updateCertificate(data);
		} else {
			await addNewCertificate(data);
		}
		navigate("/");
	};

	const getCertificate = async (): Promise<void> => {
		if (params.id) {
			const certificate = await fetchCertificateById(params.id);
			setCertificate(certificate);
		}
	};

	useEffect(() => {
		getCertificate();
	}, [params]);

	return (
		<div className="">
			<CertificateForm certificate={certificate} onSubmit={handleSubmit} />
		</div>
	);
};

export default CertificateUpsert;
