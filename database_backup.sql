--
-- PostgreSQL database dump
--

\restrict omaNhSgXGdb7h70cQgsop0AWfsoQbgKU1a4aAr1vERz4E3jh8DsoM2tpsbXr5FR

-- Dumped from database version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: graduation; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.graduation (
    id integer NOT NULL,
    university_id integer,
    grad_rate character varying(255),
    median_income character varying(255),
    employment_rate character varying(255)
);


ALTER TABLE public.graduation OWNER TO kumananm;

--
-- Name: graduation_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.graduation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.graduation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: majors; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.majors (
    id integer NOT NULL,
    name character varying(255),
    degree_type character varying(255)
);


ALTER TABLE public.majors OWNER TO kumananm;

--
-- Name: majors_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.majors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.majors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: program_admission_averages; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.program_admission_averages (
    id integer NOT NULL,
    major_id integer NOT NULL,
    university_id integer NOT NULL,
    avg1 integer,
    avg2 integer,
    avg3 integer,
    avg4 integer,
    avg5 integer,
    avg6 integer,
    avg7 integer,
    avg8 integer,
    avg9 integer,
    avg10 integer,
    avg11 integer,
    notes text
);


ALTER TABLE public.program_admission_averages OWNER TO kumananm;

--
-- Name: program_admission_averages_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

CREATE SEQUENCE public.program_admission_averages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.program_admission_averages_id_seq OWNER TO kumananm;

--
-- Name: program_admission_averages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kumananm
--

ALTER SEQUENCE public.program_admission_averages_id_seq OWNED BY public.program_admission_averages.id;


--
-- Name: residence; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.residence (
    id integer NOT NULL,
    university_id integer,
    name character varying(255),
    room_type character varying(255),
    capacity character varying(255),
    price_range character varying(255),
    rating character varying(255)
);


ALTER TABLE public.residence OWNER TO kumananm;

--
-- Name: residence_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.residence ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.residence_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    university_id integer,
    rating character varying(255),
    title character varying(255),
    body character varying(1000),
    created_at date,
    academics_rating integer,
    food_rating integer,
    safety_rating integer,
    party_scene_rating integer,
    student_life_rating integer,
    location_rating integer,
    overall_rating numeric GENERATED ALWAYS AS ((((((((academics_rating + food_rating) + safety_rating) + party_scene_rating) + location_rating) + student_life_rating))::numeric / 6.0)) STORED
);


ALTER TABLE public.reviews OWNER TO kumananm;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: university_admission; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.university_admission (
    id integer NOT NULL,
    university_id integer,
    application_deadline character varying(255),
    application_fee character varying(255),
    overall_average character varying(255),
    website_url character varying(255),
    supplementary_application boolean
);


ALTER TABLE public.university_admission OWNER TO kumananm;

--
-- Name: university_admission_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.university_admission ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_admission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: university_cost; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.university_cost (
    id integer NOT NULL,
    university_id integer,
    average_cost character varying(255),
    average_housing_cost character varying(255),
    average_meal_plan_cost character varying(255),
    average_domestic_tuition character varying(255),
    average_internationl_cost character varying(255)
);


ALTER TABLE public.university_cost OWNER TO kumananm;

--
-- Name: university_cost_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.university_cost ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_cost_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: university_information; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.university_information (
    id integer NOT NULL,
    name character varying(255),
    city character varying(255),
    province character varying(255),
    country character varying(255)
);


ALTER TABLE public.university_information OWNER TO kumananm;

--
-- Name: university_information_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.university_information ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_information_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: university_majors; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.university_majors (
    id integer NOT NULL,
    university_id integer,
    major_id integer,
    admission_average numeric,
    tuition_cost numeric,
    books_supplies character varying(255)
);


ALTER TABLE public.university_majors OWNER TO kumananm;

--
-- Name: university_majors_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.university_majors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_majors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: university_rating; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.university_rating (
    id integer NOT NULL,
    university_id numeric,
    overall numeric,
    academics numeric,
    safety numeric,
    partying numeric,
    cafeteria numeric,
    happiness numeric,
    residences numeric,
    location numeric,
    diversity numeric,
    affordability numeric,
    employability numeric
);


ALTER TABLE public.university_rating OWNER TO kumananm;

--
-- Name: university_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.university_rating ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: kumananm
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255)
);


ALTER TABLE public.users OWNER TO kumananm;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: kumananm
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: program_admission_averages id; Type: DEFAULT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.program_admission_averages ALTER COLUMN id SET DEFAULT nextval('public.program_admission_averages_id_seq'::regclass);


--
-- Data for Name: graduation; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.graduation (id, university_id, grad_rate, median_income, employment_rate) FROM stdin;
1	1	84%	80000	87.1%
2	2	85%	70000	75%
3	3	89%	70000	90%
4	4	81%	65000	90%
\.


--
-- Data for Name: majors; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.majors (id, name, degree_type) FROM stdin;
1	Chemical Engineering	B.A.Sc
2	Mechanical Engineering	B.A.Sc
3	Civil Engineering	B.A.Sc
4	Electrical Engineering	B.A.Sc
5	Computer Engineering	B.A.Sc
6	Engineering Science	B.A.Sc
7	Industrial Engineering	B.A.Sc
8	Materials Engineering	B.A.Sc
9	Mineral Engineering	B.A.Sc
10	Computer Science	B.Sc
11	Life Science	B.Sc
12	Rotman Commerce	BCom
13	Architectural Engineering	B.A.Sc
14	Biomedical Engineering	B.A.Sc
15	Geological Engineering	B.A.Sc
16	Environmental Engineering	B.A.Sc
17	Management Engineering	B.A.Sc
18	Mechatronics Engineering	B.A.Sc
19	Nantechnology Engineering	B.A.Sc
20	Software Engineering	BSE
21	System Design Engineering	B.A.Sc
22	Math + Business Administration	BBA/Bmath
23	Computer Science + Business Administration	BBA/BCS
24	Math	Bmath
25	Computing + Financial Management	BCFM
26	Math/FARM	Bmath
27	Health Science	B.H.Sc
28	Medical Sciences	B.M.Sc
29	Management + Organizational Studies	BMOS
30	Ivey Business	HBA
31	Commerce	Bcom
32	General Engineering	B.A.Sc
33	TrackOne Engineering	B.A.Sc
\.


--
-- Data for Name: program_admission_averages; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.program_admission_averages (id, major_id, university_id, avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, notes) FROM stdin;
1	1	1	93	95	96	95	95	97	96	92	97	95	95	AIF supplementary application (highly considered)
2	2	1	97	96	95	98	96	94	96	93	99	95	97	AIF supplementary application (highly considered)
3	3	1	91	94	96	94	94	97	95	94	93	95	96	AIF supplementary application (highly considered)
4	4	1	96	97	96	94	97	94	97	93	98	96	96	AIF supplementary application (highly considered)
5	5	1	98	97	96	94	98	92	96	97	99	98	96	AIF supplementary application (highly considered)
6	10	1	100	96	97	98	99	97	98	98	99	98	96	AIF supplementary application (highly considered)
7	13	1	95	93	92	93	94	94	95	93	96	94	89	AIF supplementary application (highly considered)
8	14	1	98	97	96	95	94	97	98	99	96	98	97	AIF supplementary application (highly considered)
9	15	1	89	87	90	95	93	85	87	93	92	90	87	AIF supplementary application (highly considered)
10	16	1	95	93	92	90	92	90	88	89	93	91	94	AIF supplementary application (highly considered)
11	17	1	95	96	95	96	97	94	95	96	93	95	97	AIF supplementary application (highly considered)
12	18	1	96	97	96	95	93	97	96	98	97	97	97	AIF supplementary application (highly considered)
13	19	1	89	92	93	90	91	95	94	89	88	90	93	AIF supplementary application (highly considered)
14	20	1	99	100	100	98	97	95	98	99	98	97	96	AIF supplementary application (highly considered)
15	21	1	96	95	97	98	96	97	96	94	95	96	97	AIF supplementary application (highly considered)
16	22	1	94	95	96	97	98	94	93	92	94	95	96	AIF supplementary application (highly considered)
17	23	1	98	96	97	98	99	97	97	97	99	97	95	AIF supplementary application (highly considered)
18	24	1	93	94	95	96	92	90	89	94	95	93	95	AIF supplementary application (highly considered)
19	25	1	98	96	97	98	99	97	97	97	99	97	95	AIF supplementary application (highly considered)
20	26	1	92	93	91	94	95	96	97	96	94	95	93	AIF supplementary application (highly considered)
21	10	2	85	92	82	83	89	91	92	86	83	87	85	N/A
22	27	2	92	96	97	95	93	95	94	92	91	92	94	N/A
23	28	2	92	96	97	95	93	95	94	92	91	92	94	N/A
24	29	2	92	90	87	90	91	93	88	90	91	92	90	N/A
25	30	2	94	96	97	95	93	95	98	99	97	95	94	Supplementary application is worth about 50% of your application
26	32	2	92	90	91	92	93	94	89	90	91	92	93	CASPER test is mandatory
27	27	3	95	96	97	98	97	96	94	95	95	96	99	Supplementary application (highly considered)
29	32	3	92	90	93	94	93	92	89	92	91	92	94	N/A
30	1	4	94	96	95	95	93	95	94	93	97	95	94	Supplementary Application (highly considered)
31	2	4	95	96	97	98	97	95	94	96	97	95	94	Supplementary Application (highly considered)
32	3	4	94	96	95	93	94	95	94	96	97	95	93	Supplementary Application (highly considered)
33	4	4	95	96	97	98	97	95	94	96	97	96	96	Supplementary Application (highly considered)
34	5	4	96	96	97	98	97	96	99	98	97	96	95	Supplementary Application (highly considered)
35	6	4	97	98	97	98	97	99	99	98	97	96	97	Supplementary Application (highly considered)
36	7	4	95	96	94	93	95	94	92	96	97	95	94	Supplementary Application (highly considered)
37	8	4	93	92	91	95	94	95	94	96	94	93	92	Supplementary Application (highly considered)
38	9	4	92	91	93	94	95	93	93	94	93	92	94	Supplementary Application (highly considered)
39	10	4	97	96	97	98	97	95	96	96	97	95	98	Supplementary Application (highly considered)
40	11	4	95	96	94	92	90	93	95	93	92	95	94	Supplementary Application (highly considered)
41	12	4	95	96	97	93	94	95	94	96	97	95	94	Supplementary Application (highly considered)
42	33	4	95	96	97	98	97	95	98	96	97	96	96	Supplementary Application (highly considered)
28	31	3	88	90	91	97	96	95	94	92	91	92	89	Only Supplementary Application Is Considered After 87%
\.


--
-- Data for Name: residence; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.residence (id, university_id, name, room_type, capacity, price_range, rating) FROM stdin;
1	1	Village 1	Traditional Style	1381	14292-17432	6.0
2	1	Ron Eydt Village	Traditional Style	960	14292-16564	4.0
3	1	Claudette Millar Hall	Traditional Style	588	15542-18250	9.0
4	1	Mackenzie King Village	Suite-Style	320	13076-15456	8.0
5	1	UW Place	Suite Style	1650	10952-14484	9.0
6	1	Columbia Lake Village	House	400	11048-13428	2.0
7	1	St.Jeromes University	Traditional Style	398	15964-17564	8.0
8	1	United + Renison	Traditional Style	418	15428	7.0
9	2	Ontario Hall	Hybrid Style	988	19000-20060	9.0
10	2	Perth Hall	Hybrid Style	445	18730-20000	8.0
11	2	Elgin Hall	Suite Style	407	20500	7.0
12	2	Essex Hall	Suite Style	508	20500	7.0
13	2	Saugen-Maitland Hall	Traditional Style	1241	17250-18000	5.0
14	2	Medway-Sydenham Hall	Traditional Style	613	17250-18000	4.0
15	2	Delaware Hall	Traditional Style	457	17430-18230	8.0
16	2	Bayfield Hall	Hybrid Style	230	10510-17830	6.0
17	2	Clare Hall	Hybrid Style	310	20060	8.0
18	2	Lambton Hall	Suite Style	284	12560-19880	7.0
19	2	London Hall	Suite Style	415	12980-20300	7.0
20	2	Alumni House	Suite Style	223	10800-18120	6.0
21	3	Brant House	Traditional Style	263	19493	9.0
22	3	David C. Smith House	Traditional Style	261	19493	9.0
23	3	Morris Hall	Traditional Style	201	12708-18193	8.0
24	3	McNeill House	Traditional Style	198	12708-18193	7.0
25	3	Chown Hall	Traditional Style	192	16406-18193	8.0
26	3	JDUC	Traditional Style	91	17094-19493	9.0
27	3	Victoria Hall	Traditional Style	822	12707-18193	5.0
28	3	Gordon Brockington House	Traditional Style	383	12708-18193	6.0
29	3	Waldron Tower	Traditional Style	278	17094-18193	7.0
30	3	Legget + watts	Traditional Style	525	19493	7.0
31	3	Endaayaan-Tkanonsote	Traditional Style	324	19493	9.0
32	3	Harkness Hall	Traditional Style	109	16406-18193	5.0
33	3	Jean Royce Hall	Traditional Style	597	17094-18193	7.0
34	3	Ban Righ Hall	Traditional Style	63	17094-18193	7.0
35	3	Adelaide	Traditional Style	115	16406-18193	4.0
36	4	Woodsworth College	Apartmen Style	361	13920	6.0
37	4	Trinity College	Traditional Style	470	19714-22405	5.0
38	4	Innis Collge	Apartment Style	327	13706	7.0
39	4	University College	Traditional Style	720	15287-19201	8.0
40	4	New College	Apartment Style	925	14395-20220	8.0
41	4	Chestnut	Traditional Style	1150	19952-26221	7.0
42	4	St.Michaels College	Traditional Style	695	19057-21146	7.0
43	4	CampusOne	Apartment Style	890	28945-37865	4.0
44	4	Victoria College	Traditional Style	800	15800-23819	6.0
45	4	Knox	Traditional Style	100	17898-19585	8.0
46	4	Loretto College	Traditional Style	89	18159-19209	7.0
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.reviews (id, user_id, university_id, rating, title, body, created_at, academics_rating, food_rating, safety_rating, party_scene_rating, student_life_rating, location_rating) FROM stdin;
1	3	1	\N	REV is worst residence	Enter Review Here: Enter Review Here: The REV residence is is old, dirty, and has a very social environment, not fit for studying.	2025-08-09	\N	\N	\N	\N	\N	\N
2	3	1	1	REV is worst residence	Enter Review Here: Terrible!	2025-08-09	\N	\N	\N	\N	\N	\N
3	3	1	1	REV is worst residence	 Worst Ever!	2025-08-09	\N	\N	\N	\N	\N	\N
4	3	1	2	REV is worst residence	Enter Review Here: Pretty Bad!	2025-08-09	\N	\N	\N	\N	\N	\N
5	3	1	3	REV is worst residence	Enter Review Here: Bad!	2025-08-09	\N	\N	\N	\N	\N	\N
7	3	4	4	\N	Very Good	\N	4	4	3	3	3	4
8	3	2	4	\N	Very lively school with great student life	\N	3	4	4	5	4	3
9	3	3	4	\N	Very nice campus	\N	3	4	3	5	4	3
10	3	3	4	\N	Very nice campus	\N	3	4	3	5	4	3
11	3	2	4	\N	Very nice	\N	3	4	3	5	4	3
12	3	4	4	\N	Great environment	\N	5	3	3	4	4	5
13	3	1	4	\N	Strong coop program	\N	4	4	3	3	3	3
14	3	1	4	\N	Great school for coop opportunities!	\N	5	3	3	3	4	4
15	3	4	4	\N	Very strong academic school but does not sacrifice student life 	\N	5	3	3	4	4	4
\.


--
-- Data for Name: university_admission; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.university_admission (id, university_id, application_deadline, application_fee, overall_average, website_url, supplementary_application) FROM stdin;
1	1	January 30th	50	95	https://uwaterloo.ca/future-students/	t
2	2	January 15	50	90	https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/index.html	t
3	3	February 1	50	90	https://www.queensu.ca/admission/undergraduate-programs	t
4	4	November 7 (Early) or January 15	50	95	https://future.utoronto.ca/undergraduate-programs	t
\.


--
-- Data for Name: university_cost; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.university_cost (id, university_id, average_cost, average_housing_cost, average_meal_plan_cost, average_domestic_tuition, average_internationl_cost) FROM stdin;
1	1	28230	9258	6556	12000	60000
2	2	26250	9128	9012	7200	45000
3	3	22243	14106	5525	7500	50000
4	4	30000	15545	6000	6800	65000
\.


--
-- Data for Name: university_information; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.university_information (id, name, city, province, country) FROM stdin;
1	University of Waterloo	Waterloo	Ontario	Canada
2	Western University	London	Ontario	Canada
3	Queens University	Kingston	Ontario	Canada
4	University of Toronto	Toronto	Ontario	Canada
\.


--
-- Data for Name: university_majors; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.university_majors (id, university_id, major_id, admission_average, tuition_cost, books_supplies) FROM stdin;
3	1	1	95	18000	1500
10	1	2	96	18000	1500
4	1	3	93	18000	1500
6	1	4	96	18000	1500
5	1	5	97	18000	1500
1	1	13	94	18000	1500
2	1	14	96	18000	1500
8	1	15	89	18000	1500
7	1	16	90	18000	1500
9	1	17	95	18000	1500
11	1	18	96	18000	1500
12	1	19	90	18000	1500
13	1	20	98	18000	1500
14	1	21	95	18000	1500
16	1	22	94	15000	1500
15	1	23	97	17000	1500
17	1	24	93	9000	1500
19	1	25	97	10000	1500
20	1	26	92	12000	1500
21	2	10	85	7514	\N
18	1	10	98	16000	1500
23	2	27	92	6050	\N
24	2	28	92	6050	\N
26	2	30	94	25200	1750
25	2	29	90	7514	\N
27	3	31	87	16287	\N
29	3	32	90	11914	\N
28	3	27	95	6083	\N
40	4	33	96	14180	2000
31	4	1	95	14180	2000
33	4	3	94	14180	2000
32	4	2	95	14180	2000
34	4	4	96	14180	2000
35	4	5	97	14180	2000
36	4	6	98	14180	2000
37	4	7	94	14180	2000
38	4	8	93	14180	2000
39	4	9	92	14180	2000
30	4	10	97	6100	\N
41	4	11	92	6100	\N
42	4	12	93	8000	\N
\.


--
-- Data for Name: university_rating; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.university_rating (id, university_id, overall, academics, safety, partying, cafeteria, happiness, residences, location, diversity, affordability, employability) FROM stdin;
1	1	8.0	7.0	6.0	3.0	6.0	5.0	6.0	7.0	6.0	9.0	10.0
2	2	7.0	5.0	6.0	9.0	8.0	7.0	7.0	7.0	7.0	6.0	7.0
3	3	6.0	5.0	5.0	9.0	7.0	6.0	8.0	6.0	5.0	4.0	7.0
4	4	8.0	9.0	5.0	7.0	5.0	6.0	6.0	9.0	8.0	4.0	9.0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kumananm
--

COPY public.users (id, name, email, password) FROM stdin;
1	Kyle	\N	\N
2	Jim	\N	\N
3	James	james@gmail.com	$2b$10$kbjpUthqdb5IpxTQF6.Qe.KY08J7oaSwhynb2xtUIiKGcZ3KOVyhW
4	Wilfred	wilfred@gmail.com	$2b$10$Kq81S98uojPBujTcLGhE5efgero5Gc0nfT5Hiwt80NzTpNx0jlEyu
5	James	james@gmail.com	$2b$10$RNZIFwqJWEm3B.xghIzkP.EfEaRdghmsjDV8DpGoyTivtJK2/mqui
6	James	james@gmail.com	$2b$10$89EBHMTE8MKo8sNrIqLcfelQQGMGXPuvUEiPBHxQx.bxqKrIdIfD6
7	Kumquat	kumquat@gmail.com	$2b$10$Mfd1xuqE3H3uKvoTB4BvAe9hZLsKt1Hy2c4P39NHUNGxJx/3MqYbC
\.


--
-- Name: graduation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.graduation_id_seq', 4, true);


--
-- Name: majors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.majors_id_seq', 33, true);


--
-- Name: program_admission_averages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.program_admission_averages_id_seq', 42, true);


--
-- Name: residence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.residence_id_seq', 46, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.reviews_id_seq', 15, true);


--
-- Name: university_admission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.university_admission_id_seq', 4, true);


--
-- Name: university_cost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.university_cost_id_seq', 4, true);


--
-- Name: university_information_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.university_information_id_seq', 4, true);


--
-- Name: university_majors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.university_majors_id_seq', 42, true);


--
-- Name: university_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.university_rating_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kumananm
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: graduation graduation_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.graduation
    ADD CONSTRAINT graduation_pkey PRIMARY KEY (id);


--
-- Name: majors majors_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.majors
    ADD CONSTRAINT majors_pkey PRIMARY KEY (id);


--
-- Name: program_admission_averages program_admission_averages_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.program_admission_averages
    ADD CONSTRAINT program_admission_averages_pkey PRIMARY KEY (id);


--
-- Name: residence residence_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.residence
    ADD CONSTRAINT residence_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: university_admission university_admission_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_admission
    ADD CONSTRAINT university_admission_pkey PRIMARY KEY (id);


--
-- Name: university_cost university_cost_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_cost
    ADD CONSTRAINT university_cost_pkey PRIMARY KEY (id);


--
-- Name: university_information university_information_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_information
    ADD CONSTRAINT university_information_pkey PRIMARY KEY (id);


--
-- Name: university_majors university_majors_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_majors
    ADD CONSTRAINT university_majors_pkey PRIMARY KEY (id);


--
-- Name: university_rating university_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_rating
    ADD CONSTRAINT university_rating_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: university_admission fk_admission_link; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_admission
    ADD CONSTRAINT fk_admission_link FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- Name: university_cost fk_cost_link; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_cost
    ADD CONSTRAINT fk_cost_link FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- Name: university_majors fk_majors; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_majors
    ADD CONSTRAINT fk_majors FOREIGN KEY (major_id) REFERENCES public.majors(id);


--
-- Name: residence fk_residence_university; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.residence
    ADD CONSTRAINT fk_residence_university FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- Name: reviews fk_reviews_university; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_university FOREIGN KEY (university_id) REFERENCES public.university_information(id) ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_user; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: university_majors fk_uni_major; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.university_majors
    ADD CONSTRAINT fk_uni_major FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- Name: graduation fk_university_graduation; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.graduation
    ADD CONSTRAINT fk_university_graduation FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- Name: program_admission_averages program_admission_averages_major_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.program_admission_averages
    ADD CONSTRAINT program_admission_averages_major_id_fkey FOREIGN KEY (major_id) REFERENCES public.majors(id);


--
-- Name: program_admission_averages program_admission_averages_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kumananm
--

ALTER TABLE ONLY public.program_admission_averages
    ADD CONSTRAINT program_admission_averages_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.university_information(id);


--
-- PostgreSQL database dump complete
--

\unrestrict omaNhSgXGdb7h70cQgsop0AWfsoQbgKU1a4aAr1vERz4E3jh8DsoM2tpsbXr5FR

