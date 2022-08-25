import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CertificateList from "./components/CertificateList";
import { LOCAL_STORAGE_KEY } from "./constants";
import { MOCK_DATA } from './data/mock-data';
import CertificateUpsert from './components/CertificateUpsert';

import "./App.css";


const App = (): JSX.Element => {
	useEffect(() => {
		if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_DATA))
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CertificateList />} />
				<Route path="/add-new" element={<CertificateUpsert />} />
				<Route path="/update/:id" element={<CertificateUpsert />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
