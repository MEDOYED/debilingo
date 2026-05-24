\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{san}

% --- GRAFIKI ---
\usepackage{graphicx}
\graphicspath{{img/}}

% ==================================================
% ROZMIARY CZCIONEK
% ==================================================
\newcommand{\mainfontsize}{12pt}
\newcommand{\footfontsize}{10pt}

% ==================================================
% OPCJE CZCIONEK
% ==================================================
\DeclareOption{times}{
  \renewcommand{\rmdefault}{ptm}
  \renewcommand{\mainfontsize}{12pt}
  \renewcommand{\footfontsize}{10pt}
}
\DeclareOption{verdana}{
  \RequirePackage{fontspec}
  \setmainfont{Verdana}
  \renewcommand{\mainfontsize}{11pt}
  \renewcommand{\footfontsize}{9pt}
}
\DeclareOption{calibri}{
  \RequirePackage{fontspec}
  \setmainfont{Calibri}
  \renewcommand{\mainfontsize}{11pt}
  \renewcommand{\footfontsize}{9pt}
}

\ExecuteOptions{times}
\ProcessOptions\relax

\LoadClass[a4paper,\mainfontsize]{article}

% ==================================================
% PAKIETY
% ==================================================
\RequirePackage[polish]{babel}
\RequirePackage[T1]{fontenc}
\RequirePackage{cmap} % do mapowania polskich znaków
\RequirePackage[utf8]{inputenc}
\RequirePackage{geometry}
\RequirePackage{setspace}
\RequirePackage{indentfirst}
\RequirePackage{titlesec}
\RequirePackage{caption}
\RequirePackage{footmisc}
\RequirePackage{ragged2e}
\RequirePackage{tocloft}

\RequirePackage{newtxtext} % zamiana na nową bibliotekę zgodną c cmap
\RequirePackage{newtxmath} % zamiana na nową bibliotekę zgodną c cmap

% ==================================================
% MARGINESY
% ==================================================
\geometry{
  left=3cm,
  right=2cm,
  top=2.5cm,
  bottom=2.5cm
}

% ==================================================
% INTERLINIA / JUSTOWANIE
% ==================================================
\onehalfspacing
\AtBeginDocument{\justifying}

% ==================================================
% AKAPITY
% ==================================================
\setlength{\parindent}{1.25cm}
\setlength{\parskip}{0pt}

% ==================================================
% PRZYPISY
% ==================================================
\renewcommand{\footnotesize}{%
  \fontsize{\footfontsize}{\footfontsize+2}\selectfont
}
\setlength{\footnotesep}{0.5\baselineskip}

% ==================================================
% ROZDZIAŁY
% ==================================================
\usepackage{etoolbox}

\pretocmd{\section}{\clearpage}{}{}


% ==================================================
% PODPISY RYSUNKÓW I TABEL
% ==================================================

% RYSUNKI — podpis wycentrowany pod rysunkiem
\captionsetup[figure]{
  font=footnotesize,
  justification=centering,
  singlelinecheck=true
}

% TABELE — podpis na górze, wyrównany do prawej
\captionsetup[table]{
  font=footnotesize,
  justification=raggedleft,
  singlelinecheck=true
}

\newcommand{\zrodlo}[1]{%
  \vspace{2mm}
  {\footnotesize Źródło: #1}
}

% ==================================================
% CSQUOTES (wymagane przez biblatex + babel)
% ==================================================
\RequirePackage{csquotes}

% ==================================================
% BIBLATEX
% ==================================================
\RequirePackage[
  backend=biber,
  style=numeric,
  sorting=none,
  giveninits=true,
  url=true,
  date=year
]{biblatex}

\newcommand{\bibliografia}[1]{%
  \addbibresource{#1}
}

% ==================================================
% BIBLIOGRAFIA W SPISIE TREŚCI
% ==================================================
\pretocmd{\printbibliography}{%
  \clearpage
  \phantomsection
  \addcontentsline{toc}{section}{Bibliografia}
}{}{}

% ==================================================
% METADANE STRONY TYTUŁOWEJ – RAPORT
% ==================================================
\newcommand{\uczelnia}[1]{\gdef\@uczelnia{#1}}
\newcommand{\przedmiot}[1]{\gdef\@przedmiot{#1}}
\newcommand{\autor}[1]{\gdef\@autor{#1}}
\newcommand{\nralbumu}[1]{\gdef\@nralbumu{#1}}
\newcommand{\tytul}[1]{\gdef\@tytul{#1}}
\newcommand{\prowadzacy}[1]{\gdef\@prowadzacy{#1}}
\newcommand{\grupa}[1]{\gdef\@grupa{#1}}
\newcommand{\miasto}[1]{\gdef\@miasto{#1}}
\newcommand{\rok}[1]{\gdef\@rok{#1}}

% wartości domyślne
\uczelnia{}
\przedmiot{}
\autor{}
\nralbumu{}
\tytul{}
\prowadzacy{}
\grupa{}
\miasto{}
\rok{}

% ==================================================
% STRONA TYTUŁOWA – RAPORT (RENDER)
% ==================================================
\newcommand{\maketitlepage}{%
\begin{titlepage}
\thispagestyle{empty}

\vspace{1.5cm}

\begin{center}
{\Large\textbf{\@uczelnia}}\\[0.5cm]
{\large Instytut Technologii Informatycznych}
\end{center}

\vspace{0.5cm}

\begin{center}
Kierunek studiów:\\[0.2cm]
\textbf{INFORMATYKA}
\end{center}

\vspace{0.5cm}

\begin{center}
Przedmiot:\\[0.2cm]
\textbf{\@przedmiot}
\end{center}

\vspace{1cm}

\begin{center}
{\Large\textbf{\@tytul}}\\[0.4cm]
\end{center}

\vspace{1cm}

\begin{center}
\textbf{\@autor}\\
Nr albumu: \@nralbumu\\
Grupa: \@grupa
\end{center}

\vfill

\hspace*{0.55\textwidth}
\begin{minipage}{\textwidth}
\raggedright
Prowadzący:\\
\textbf{\@prowadzacy}
\end{minipage}

\vfill

\begin{center}
\@miasto\ \@rok
\end{center}
\end{titlepage}
}

% ==================================================
% SPIS TABEL I RYSUNKÓW
% ==================================================
\newcommand{\spistabel}{%
  \clearpage
  \listoftables
}

\newcommand{\spisrysunkow}{%
  \clearpage
  \listoffigures
}

% ==================================================
% HIPERŁĄCZA (SPIS TREŚCI, ODNIESIENIA)
% ==================================================
\RequirePackage[
  unicode,
  colorlinks=true,
  linkcolor=black,
  citecolor=black,
  urlcolor=black,
  pdfborder={0 0 0}
]{hyperref}

% ==================================================
% SPIS TREŚCI
% ==================================================
\newcommand{\spistresci}{%
  \clearpage
  \tableofcontents
  \clearpage
}

\endinput