import type { Locale } from "./types";

export const LOCALES: Locale[] = ["es", "en", "fr", "de", "it", "pt"];

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
  de: "DE",
  it: "IT",
  pt: "PT",
};

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  selectBoat: string;
  selectBoatPlaceholder: string;
  departureDate: string;
  passengerData: string;
  passenger: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  docDni: string;
  docNie: string;
  docPassport: string;
  docOther: string;
  addPassenger: string;
  submitRegistration: string;
  maxCapacityReached: string;
  submitting: string;
  submitSuccess: string;
  submitError: string;
  gdprConsent: string;
  pdfTitle: string;
  pdfBoat: string;
  pdfDate: string;
  pdfColName: string;
  pdfColDocType: string;
  pdfColDocNumber: string;
  pdfFooterLabel: string;
  emailSubject: string;
  emailIntro: string;
  emailPassengerList: string;
  emailCopyHint: string;
}

export const translations: Record<Locale, TranslationStrings> = {
  es: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Portal Oficial de Registro de Pasajeros - Marina del Este",
    selectBoat: "Selecciona tu barco",
    selectBoatPlaceholder: "— Elige una embarcación —",
    departureDate: "Fecha de salida",
    passengerData: "Datos de los Pasajeros",
    passenger: "Pasajero",
    fullName: "Nombre Completo",
    documentType: "Tipo de Documento",
    documentNumber: "Número de Documento",
    docDni: "DNI",
    docNie: "NIE",
    docPassport: "Pasaporte",
    docOther: "Otro",
    addPassenger: "Añadir Pasajero",
    submitRegistration: "Enviar Registro",
    maxCapacityReached: "Capacidad máxima de este barco alcanzada",
    submitting: "Enviando registro…",
    submitSuccess: "Registro enviado correctamente.",
    submitError: "Error al enviar el registro. Inténtalo de nuevo.",
    gdprConsent:
      "Acepto la Política de Privacidad y consiento el tratamiento de mis datos personales y los de mis acompañantes con la única finalidad de elaborar la lista de pasajeros requerida para el despacho del buque ante la Capitanía Marítima, de acuerdo con la legislación española aplicable al arrendamiento náutico con patrón: artículo 18 (despacho de buques), artículos 307 y 308.3 (arrendamiento náutico con dotación) de la Ley 14/2014, de 24 de julio, de Navegación Marítima, y artículo 11.4.c) del Real Decreto 186/2023, de 21 de marzo (Reglamento de Ordenación de la Navegación Marítima). Responsable del tratamiento: Náutica Elite. Destinatarios: Capitanía Marítima y aseguradora del buque.",
    pdfTitle: "LISTA DE PASAJEROS",
    pdfBoat: "Embarcación",
    pdfDate: "Fecha de salida",
    pdfColName: "Nombre Completo",
    pdfColDocType: "Tipo Doc.",
    pdfColDocNumber: "Nº Documento",
    pdfFooterLabel: "Cláusula de consentimiento RGPD",
    emailSubject: "Manifest de Pasajeros — Náutica Elite",
    emailIntro: "Se adjunta el manifest de pasajeros generado desde el portal de check-in.",
    emailPassengerList: "Lista de pasajeros (texto plano para copiar):",
    emailCopyHint:
      "Puede copiar y pegar los documentos directamente en la web del Ministerio desde su móvil.",
  },
  en: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Official Passenger Registration Portal - Marina del Este",
    selectBoat: "Select your boat",
    selectBoatPlaceholder: "— Choose a vessel —",
    departureDate: "Departure date",
    passengerData: "Passenger Details",
    passenger: "Passenger",
    fullName: "Full Name",
    documentType: "Document Type",
    documentNumber: "Document Number",
    docDni: "National ID (DNI)",
    docNie: "Foreign ID (NIE)",
    docPassport: "Passport",
    docOther: "Other",
    addPassenger: "Add Passenger",
    submitRegistration: "Submit Registration",
    maxCapacityReached: "Maximum capacity for this vessel reached",
    submitting: "Submitting registration…",
    submitSuccess: "Registration sent successfully.",
    submitError: "Failed to submit registration. Please try again.",
    gdprConsent:
      "I accept the Privacy Policy and consent to the processing of my personal data and that of my companions for the sole purpose of preparing the passenger list required for the vessel's clearance (despacho) before the Maritime Captaincy, in accordance with Spanish law on skippered nautical charter: Article 18 (vessel clearance), Articles 307 and 308.3 (charter with crew) of Law 14/2014 of 24 July on Maritime Navigation, and Article 11.4(c) of Royal Decree 186/2023 of 21 March (Regulation on the Organisation of Maritime Navigation). Data Controller: Náutica Elite. Recipients: Maritime Captaincy and vessel insurer.",
    pdfTitle: "PASSENGER MANIFEST",
    pdfBoat: "Vessel",
    pdfDate: "Departure date",
    pdfColName: "Full Name",
    pdfColDocType: "Doc. Type",
    pdfColDocNumber: "Document No.",
    pdfFooterLabel: "GDPR consent clause",
    emailSubject: "Passenger Manifest — Náutica Elite",
    emailIntro: "The passenger manifest generated from the check-in portal is attached.",
    emailPassengerList: "Passenger list (plain text for copying):",
    emailCopyHint:
      "You can copy and paste the documents directly into the Ministry website from your mobile phone.",
  },
  fr: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Portail Officiel d'Enregistrement des Passagers - Marina del Este",
    selectBoat: "Sélectionnez votre bateau",
    selectBoatPlaceholder: "— Choisissez un navire —",
    departureDate: "Date de départ",
    passengerData: "Données des Passagers",
    passenger: "Passager",
    fullName: "Nom Complet",
    documentType: "Type de Document",
    documentNumber: "Numéro de Document",
    docDni: "Carte d'identité (DNI)",
    docNie: "NIE",
    docPassport: "Passeport",
    docOther: "Autre",
    addPassenger: "Ajouter un Passager",
    submitRegistration: "Envoyer l'Enregistrement",
    maxCapacityReached: "Capacité maximale de ce navire atteinte",
    submitting: "Envoi de l'enregistrement…",
    submitSuccess: "Enregistrement envoyé avec succès.",
    submitError: "Erreur lors de l'envoi. Veuillez réessayer.",
    gdprConsent:
      "J'accepte la politique de confidentialité et consens au traitement de mes données personnelles et de celles de mes accompagnants dans le seul but d'établir la liste des passagers exigée pour le despacho du navire auprès de la Capitainerie Maritime, conformément à la législation espagnole applicable à l'affrètement nautique avec patron : article 18 (despacho des navires), articles 307 et 308.3 (affrètement nautique avec équipage) de la Loi 14/2014 du 24 juillet sur la navigation maritime, et article 11.4.c) du Décret royal 186/2023 du 21 mars (Règlement d'organisation de la navigation maritime). Responsable : Náutica Elite. Destinataires : Capitainerie Maritime et assureur du navire.",
    pdfTitle: "MANIFESTE DES PASSAGERS",
    pdfBoat: "Navire",
    pdfDate: "Date de départ",
    pdfColName: "Nom Complet",
    pdfColDocType: "Type Doc.",
    pdfColDocNumber: "Nº Document",
    pdfFooterLabel: "Clause de consentement RGPD",
    emailSubject: "Manifeste des Passagers — Náutica Elite",
    emailIntro: "Le manifeste des passagers généré depuis le portail de check-in est joint.",
    emailPassengerList: "Liste des passagers (texte brut pour copier) :",
    emailCopyHint:
      "Vous pouvez copier-coller les documents directement sur le site du Ministère depuis votre mobile.",
  },
  de: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Offizielles Passagier-Registrierungsportal - Marina del Este",
    selectBoat: "Wählen Sie Ihr Boot",
    selectBoatPlaceholder: "— Schiff auswählen —",
    departureDate: "Abfahrtsdatum",
    passengerData: "Passagierdaten",
    passenger: "Passagier",
    fullName: "Vollständiger Name",
    documentType: "Dokumenttyp",
    documentNumber: "Dokumentnummer",
    docDni: "Personalausweis (DNI)",
    docNie: "NIE",
    docPassport: "Reisepass",
    docOther: "Sonstiges",
    addPassenger: "Passagier Hinzufügen",
    submitRegistration: "Registrierung Senden",
    maxCapacityReached: "Maximale Kapazität dieses Schiffes erreicht",
    submitting: "Registrierung wird gesendet…",
    submitSuccess: "Registrierung erfolgreich gesendet.",
    submitError: "Fehler beim Senden. Bitte versuchen Sie es erneut.",
    gdprConsent:
      "Ich akzeptiere die Datenschutzerklärung und willige in die Verarbeitung meiner personenbezogenen Daten und der meiner Begleiter ein, ausschließlich zum Zweck der Erstellung der Passagierliste, die für die Abfertigung (Despacho) des Schiffes bei der Maritimen Kapitänskommandantur erforderlich ist, gemäß dem spanischen Recht für den nautischen Charter mit Skipper: Artikel 18 (Schiffsabfertigung), Artikel 307 und 308.3 (Charter mit Besatzung) des Gesetzes 14/2014 vom 24. Juli über die Seeschifffahrt sowie Artikel 11.4.c) des Königlichen Dekrets 186/2023 vom 21. März (Verordnung über die Organisation der Seeschifffahrt). Verantwortlicher: Náutica Elite. Empfänger: Maritime Kapitänskommandantur und Schiffsversicherer.",
    pdfTitle: "PASSAGIERLISTE",
    pdfBoat: "Schiff",
    pdfDate: "Abfahrtsdatum",
    pdfColName: "Vollständiger Name",
    pdfColDocType: "Dok.-Typ",
    pdfColDocNumber: "Dokument-Nr.",
    pdfFooterLabel: "DSGVO-Einwilligungsklausel",
    emailSubject: "Passagierliste — Náutica Elite",
    emailIntro: "Die vom Check-in-Portal erstellte Passagierliste ist angehängt.",
    emailPassengerList: "Passagierliste (Klartext zum Kopieren):",
    emailCopyHint:
      "Sie können die Dokumente direkt von Ihrem Mobiltelefon auf der Website des Ministeriums einfügen.",
  },
  it: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Portale Ufficiale di Registrazione Passeggeri - Marina del Este",
    selectBoat: "Seleziona la tua barca",
    selectBoatPlaceholder: "— Scegli un'imbarcazione —",
    departureDate: "Data di partenza",
    passengerData: "Dati dei Passeggeri",
    passenger: "Passeggero",
    fullName: "Nome Completo",
    documentType: "Tipo di Documento",
    documentNumber: "Numero di Documento",
    docDni: "Carta d'identità (DNI)",
    docNie: "NIE",
    docPassport: "Passaporto",
    docOther: "Altro",
    addPassenger: "Aggiungi Passeggero",
    submitRegistration: "Invia Registrazione",
    maxCapacityReached: "Capacità massima di questa imbarcazione raggiunta",
    submitting: "Invio registrazione in corso…",
    submitSuccess: "Registrazione inviata con successo.",
    submitError: "Errore durante l'invio. Riprova.",
    gdprConsent:
      "Accetto l'Informativa sulla privacy e acconsento al trattamento dei miei dati personali e di quelli dei miei accompagnatori al solo scopo di redigere l'elenco passeggeri richiesto per il despacho dell'imbarcazione presso la Capitaneria Marittima, conformemente alla legislazione spagnola applicabile al noleggio nautico con skipper: articolo 18 (despacho delle navi), articoli 307 e 308.3 (noleggio nautico con equipaggio) della Legge 14/2014 del 24 luglio sulla navigazione marittima, e articolo 11.4.c) del Regio Decreto 186/2023 del 21 marzo (Regolamento di ordinazione della navigazione marittima). Titolare del trattamento: Náutica Elite. Destinatari: Capitaneria Marittima e assicuratore della nave.",
    pdfTitle: "MANIFESTO DEI PASSEGGERI",
    pdfBoat: "Imbarcazione",
    pdfDate: "Data di partenza",
    pdfColName: "Nome Completo",
    pdfColDocType: "Tipo Doc.",
    pdfColDocNumber: "Nº Documento",
    pdfFooterLabel: "Clausola di consenso GDPR",
    emailSubject: "Manifesto Passeggeri — Náutica Elite",
    emailIntro: "In allegato il manifesto passeggeri generato dal portale di check-in.",
    emailPassengerList: "Elenco passeggeri (testo semplice da copiare):",
    emailCopyHint:
      "Puoi copiare e incollare i documenti direttamente sul sito del Ministero dal tuo telefono.",
  },
  pt: {
    appTitle: "Náutica Elite Check-In",
    appSubtitle: "Portal Oficial de Registo de Passageiros - Marina del Este",
    selectBoat: "Selecione o seu barco",
    selectBoatPlaceholder: "— Escolha uma embarcação —",
    departureDate: "Data de partida",
    passengerData: "Dados dos Passageiros",
    passenger: "Passageiro",
    fullName: "Nome Completo",
    documentType: "Tipo de Documento",
    documentNumber: "Número de Documento",
    docDni: "Bilhete de Identidade (DNI)",
    docNie: "NIE",
    docPassport: "Passaporte",
    docOther: "Outro",
    addPassenger: "Adicionar Passageiro",
    submitRegistration: "Enviar Registo",
    maxCapacityReached: "Capacidade máxima deste barco atingida",
    submitting: "A enviar registo…",
    submitSuccess: "Registo enviado com sucesso.",
    submitError: "Erro ao enviar o registo. Tente novamente.",
    gdprConsent:
      "Aceito a Política de Privacidade e consinto no tratamento dos meus dados pessoais e dos meus acompanhantes com o único propósito de elaborar a lista de passageiros exigida para o despacho da embarcação perante a Capitania Marítima, de acordo com a legislação espanhola aplicável ao arrendamento náutico com patrão: artigo 18 (despacho de navios), artigos 307 e 308.3 (arrendamento náutico com tripulação) da Lei 14/2014, de 24 de julho, de Navegação Marítima, e artigo 11.4.c) do Real Decreto 186/2023, de 21 de março (Regulamento de Ordenação da Navegação Marítima). Responsável pelo tratamento: Náutica Elite. Destinatários: Capitania Marítima e seguradora do navio.",
    pdfTitle: "MANIFESTO DE PASSAGEIROS",
    pdfBoat: "Embarcação",
    pdfDate: "Data de partida",
    pdfColName: "Nome Completo",
    pdfColDocType: "Tipo Doc.",
    pdfColDocNumber: "Nº Documento",
    pdfFooterLabel: "Cláusula de consentimento RGPD",
    emailSubject: "Manifesto de Passageiros — Náutica Elite",
    emailIntro: "Segue em anexo o manifesto de passageiros gerado pelo portal de check-in.",
    emailPassengerList: "Lista de passageiros (texto simples para copiar):",
    emailCopyHint:
      "Pode copiar e colar os documentos diretamente no site do Ministério a partir do telemóvel.",
  },
};

export function getDocumentTypeLabel(
  locale: Locale,
  type: string,
): string {
  const t = translations[locale];
  const map: Record<string, string> = {
    dni: t.docDni,
    nie: t.docNie,
    passport: t.docPassport,
    other: t.docOther,
  };
  return map[type] ?? type;
}

/** BCP47 tags with Monday as first day of week (en-GB, not en-US). */
export function localeToHtmlLang(locale: Locale): string {
  const map: Record<Locale, string> = {
    es: "es-ES",
    en: "en-GB",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
  };
  return map[locale];
}
