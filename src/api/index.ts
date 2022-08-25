import { Certificate } from "../interfaces/certificate";
import { LOCAL_STORAGE_KEY } from '../constants/index';

export const fetchCertificates = (): Promise<Certificate[]> => {
  return new Promise((resolve, reject) => {
    const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        resolve(JSON.parse(data))
      } catch (e) {
        console.log('An error occurred while parsing certificates')
        resolve([]);
      }
    }
    resolve([]);
  })
}

export const fetchCertificateById = (id: string): Promise<Certificate | undefined> => {
  return new Promise((resolve, reject) => {
    const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        const certificates: Certificate[] = JSON.parse(data);
        resolve(certificates.find(certificate => certificate.id === id))
      } catch (e) {
        console.log('An error occurred while parsing certificates')
        resolve(undefined);
      }
    }
    resolve(undefined);
  })
}

export const addNewCertificate = (certificate: Certificate): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...JSON.parse(data), certificate]))
      }

      resolve('')
    }, 1500)
  })
}

export const updateCertificate = (certificate: Certificate): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsed:Certificate[] = JSON.parse(data);
        const index = parsed.findIndex(item => item.id === certificate.id)
        parsed.splice(index, 1, certificate)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed))
      }

      resolve('')
    }, 1500)
  })
}

export const deleteCertificate = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsedData: Certificate[] = JSON.parse(data);
        const index = parsedData.findIndex(certificate => certificate.id === id)
        parsedData.splice(index, 1)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...parsedData]))
      }

      resolve('')
    }, 1500)
  })
}