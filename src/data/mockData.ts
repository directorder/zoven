// RADICI Mock Data
export const radiciStats = {
  prenotazioniMese: 127,
  clientiAttivi: 342,
  fatturatoMese: 18450,
  camereOccupate: 8,
  totaleCamere: 12,
  tavoliRiservati: 24,
  ordiniBottega: 56,
}

export const radiciPrenotazioni = [
  { id: 1, cliente: 'Marco Ferretti', tipo: 'Camera', check_in: '20 Apr', check_out: '23 Apr', persone: 2, stato: 'confermata', valore: 360 },
  { id: 2, cliente: 'Laura Bianchi', tipo: 'Tavolo', check_in: '21 Apr', check_out: '21 Apr', persone: 4, stato: 'confermata', valore: 120 },
  { id: 3, cliente: 'Giacomo Ricci', tipo: 'Camera', check_in: '22 Apr', check_out: '25 Apr', persone: 3, stato: 'in attesa', valore: 480 },
  { id: 4, cliente: 'Sofia Conti', tipo: 'Tavolo', check_in: '22 Apr', check_out: '22 Apr', persone: 6, stato: 'confermata', valore: 210 },
  { id: 5, cliente: 'Alessio Mancini', tipo: 'Camera', check_in: '24 Apr', check_out: '27 Apr', persone: 2, stato: 'confermata', valore: 390 },
  { id: 6, cliente: 'Chiara Romano', tipo: 'Bottega', check_in: '19 Apr', check_out: '19 Apr', persone: 1, stato: 'completata', valore: 85 },
]

export const radiciClienti = [
  { id: 1, nome: 'Marco Ferretti', email: 'marco@email.it', telefono: '+39 345 1234567', visite: 8, spesaTotale: 2840, ultimaVisita: '20 Apr 2026', tag: 'VIP' },
  { id: 2, nome: 'Laura Bianchi', email: 'laura@email.it', telefono: '+39 338 9876543', visite: 3, spesaTotale: 960, ultimaVisita: '21 Apr 2026', tag: 'Fedele' },
  { id: 3, nome: 'Giacomo Ricci', email: 'giacomo@email.it', telefono: '+39 347 5556789', visite: 1, spesaTotale: 480, ultimaVisita: '22 Apr 2026', tag: 'Nuovo' },
  { id: 4, nome: 'Sofia Conti', email: 'sofia@email.it', telefono: '+39 331 2223334', visite: 5, spesaTotale: 1450, ultimaVisita: '22 Apr 2026', tag: 'Fedele' },
  { id: 5, nome: 'Alessio Mancini', email: 'alessio@email.it', telefono: '+39 366 7778889', visite: 12, spesaTotale: 5200, ultimaVisita: '24 Apr 2026', tag: 'VIP' },
]

export const radiciProdottiBottega = [
  { id: 1, nome: 'Vino Rosso Riserva', categoria: 'Vini', stock: 48, prezzo: 18, venduti: 34 },
  { id: 2, nome: 'Olio EVO Bio', categoria: 'Oli', stock: 23, prezzo: 14, venduti: 67 },
  { id: 3, nome: 'Miele di Acacia', categoria: 'Miele', stock: 15, prezzo: 9, venduti: 28 },
  { id: 4, nome: 'Marmellata Fichi', categoria: 'Conserve', stock: 31, prezzo: 6, venduti: 45 },
  { id: 5, nome: 'Salumi Misti Box', categoria: 'Salumi', stock: 8, prezzo: 35, venduti: 19 },
]

export const radiciChartData = [
  { mese: 'Nov', fatturato: 8200 },
  { mese: 'Dic', fatturato: 12400 },
  { mese: 'Gen', fatturato: 6800 },
  { mese: 'Feb', fatturato: 9100 },
  { mese: 'Mar', fatturato: 14200 },
  { mese: 'Apr', fatturato: 18450 },
]

// A TAVOLA Mock Data
export const tavolaStats = {
  ordiniOggi: 47,
  fatturatoOggi: 1840,
  risparmioCommissioni: 368,
  clientiNuovi: 12,
  ordiniOnline: 31,
  ordiniWhatsapp: 16,
  mediaOrdineFull: 39.2,
}

export const tavolaOrdini = [
  { id: 1001, cliente: 'Luca Rossi', items: 'Margherita x2, Diavola x1', canale: 'Online', ora: '12:34', stato: 'in preparazione', totale: 28 },
  { id: 1002, cliente: 'Anna Verdi', items: 'Quattro Stagioni, Tiramisù x2', canale: 'WhatsApp', ora: '12:41', stato: 'pronto', totale: 32 },
  { id: 1003, cliente: 'Paolo Neri', items: 'Calzone x2, Coca Cola x2', canale: 'Online', ora: '12:55', stato: 'consegnato', totale: 24 },
  { id: 1004, cliente: 'Maria Russo', items: 'Capricciosa x3', canale: 'Online', ora: '13:02', stato: 'nuovo', totale: 39 },
  { id: 1005, cliente: 'Franco Bruno', items: 'Marinara x1, Acciughe x1', canale: 'WhatsApp', ora: '13:10', stato: 'nuovo', totale: 22 },
]

export const tavolaMenu = [
  { id: 1, nome: 'Margherita', categoria: 'Classiche', prezzo: 8.50, disponibile: true, ordini: 234 },
  { id: 2, nome: 'Diavola', categoria: 'Classiche', prezzo: 10.00, disponibile: true, ordini: 187 },
  { id: 3, nome: 'Quattro Stagioni', categoria: 'Classiche', prezzo: 11.50, disponibile: true, ordini: 142 },
  { id: 4, nome: 'Calzone', categoria: 'Speciali', prezzo: 11.00, disponibile: true, ordini: 98 },
  { id: 5, nome: 'Capricciosa', categoria: 'Classiche', prezzo: 11.00, disponibile: true, ordini: 165 },
  { id: 6, nome: 'Tiramisù', categoria: 'Dolci', prezzo: 5.00, disponibile: true, ordini: 89 },
]

export const tavolaClienti = [
  { id: 1, nome: 'Luca Rossi', ordini: 24, spesaTotale: 580, ultimoOrdine: '20 Apr', fedeltaPunti: 580 },
  { id: 2, nome: 'Anna Verdi', ordini: 18, spesaTotale: 432, ultimoOrdine: '19 Apr', fedeltaPunti: 432 },
  { id: 3, nome: 'Paolo Neri', ordini: 35, spesaTotale: 875, ultimoOrdine: '20 Apr', fedeltaPunti: 875 },
  { id: 4, nome: 'Maria Russo', ordini: 9, spesaTotale: 218, ultimoOrdine: '22 Apr', fedeltaPunti: 218 },
]

export const tavolaChartData = [
  { giorno: 'Lun', ordini: 28, risparmio: 112 },
  { giorno: 'Mar', ordini: 35, risparmio: 140 },
  { giorno: 'Mer', ordini: 42, risparmio: 168 },
  { giorno: 'Gio', ordini: 38, risparmio: 152 },
  { giorno: 'Ven', ordini: 67, risparmio: 268 },
  { giorno: 'Sab', ordini: 89, risparmio: 356 },
  { giorno: 'Dom', ordini: 72, risparmio: 288 },
]

// CLINIC Mock Data
export const clinicStats = {
  appuntamentiOggi: 18,
  nuoviPazienti: 5,
  richiamiInviati: 32,
  chiamatePerse: 3,
  fatturatoMese: 28600,
  tassoConferma: 94,
}

export const clinicAppuntamenti = [
  { id: 1, paziente: 'Giovanni Esposito', tipo: 'Visita Controllo', ora: '09:00', durata: 30, medico: 'Dr. Ferri', stato: 'confermato' },
  { id: 2, paziente: 'Valentina Greco', tipo: 'Igiene Dentale', ora: '09:30', durata: 60, medico: 'Dr.ssa Marino', stato: 'confermato' },
  { id: 3, paziente: 'Roberto Fontana', tipo: 'Ortodonzia', ora: '10:30', durata: 45, medico: 'Dr. Ferri', stato: 'in attesa' },
  { id: 4, paziente: 'Claudia Serra', tipo: 'Visita Estetica', ora: '11:15', durata: 30, medico: 'Dr.ssa Ricci', stato: 'confermato' },
  { id: 5, paziente: 'Antonio Longo', tipo: 'Estrazione', ora: '12:00', durata: 60, medico: 'Dr. Ferri', stato: 'confermato' },
  { id: 6, paziente: 'Elena Caruso', tipo: 'Visita Controllo', ora: '14:00', durata: 30, medico: 'Dr.ssa Marino', stato: 'nuovo' },
  { id: 7, paziente: 'Fabio Leone', tipo: 'Sbiancamento', ora: '15:00', durata: 90, medico: 'Dr.ssa Ricci', stato: 'confermato' },
]

export const clinicPazienti = [
  { id: 1, nome: 'Giovanni Esposito', eta: 45, telefono: '+39 340 1112223', ultimaVisita: '20 Apr', prossimaVisita: '20 Lug', trattamenti: 12, valore: 3400 },
  { id: 2, nome: 'Valentina Greco', eta: 32, telefono: '+39 335 4445556', ultimaVisita: '20 Apr', prossimaVisita: '20 Ott', trattamenti: 7, valore: 2100 },
  { id: 3, nome: 'Roberto Fontana', eta: 28, telefono: '+39 347 7778889', ultimaVisita: '15 Apr', prossimaVisita: '20 Apr', trattamenti: 4, valore: 1600 },
  { id: 4, nome: 'Claudia Serra', eta: 38, telefono: '+39 366 0001112', ultimaVisita: '10 Apr', prossimaVisita: '20 Apr', trattamenti: 9, valore: 2800 },
]

export const clinicChartData = [
  { mese: 'Nov', appuntamenti: 142, fatturato: 21400 },
  { mese: 'Dic', appuntamenti: 128, fatturato: 19200 },
  { mese: 'Gen', appuntamenti: 156, fatturato: 23400 },
  { mese: 'Feb', appuntamenti: 168, fatturato: 25200 },
  { mese: 'Mar', appuntamenti: 182, fatturato: 27300 },
  { mese: 'Apr', appuntamenti: 191, fatturato: 28600 },
]
