--
-- PostgreSQL database dump
--

\restrict vTLKXctQOdR3PYxnbIr7Tgp7dTcKW40YzQcynZPLrcu3kSvlgOBjHymKOVsVSt2

-- Dumped from database version 13.22
-- Dumped by pg_dump version 14.20 (Homebrew)

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO core;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO core;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO core;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO core;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO core;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO core;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: core_user_user; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.core_user_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    public_id uuid NOT NULL,
    username character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(254) NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL
);


ALTER TABLE public.core_user_user OWNER TO core;

--
-- Name: core_user_user_groups; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.core_user_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.core_user_user_groups OWNER TO core;

--
-- Name: core_user_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.core_user_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_user_groups_id_seq OWNER TO core;

--
-- Name: core_user_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.core_user_user_groups_id_seq OWNED BY public.core_user_user_groups.id;


--
-- Name: core_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.core_user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_user_id_seq OWNER TO core;

--
-- Name: core_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.core_user_user_id_seq OWNED BY public.core_user_user.id;


--
-- Name: core_user_user_user_permissions; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.core_user_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.core_user_user_user_permissions OWNER TO core;

--
-- Name: core_user_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.core_user_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_user_user_permissions_id_seq OWNER TO core;

--
-- Name: core_user_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.core_user_user_user_permissions_id_seq OWNED BY public.core_user_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO core;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO core;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO core;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO core;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO core;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: core
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO core;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: core
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: core
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO core;

--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: core_user_user id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user ALTER COLUMN id SET DEFAULT nextval('public.core_user_user_id_seq'::regclass);


--
-- Name: core_user_user_groups id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_groups ALTER COLUMN id SET DEFAULT nextval('public.core_user_user_groups_id_seq'::regclass);


--
-- Name: core_user_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.core_user_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
\.


--
-- Data for Name: core_user_user; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.core_user_user (id, password, last_login, public_id, username, first_name, last_name, email, is_active, is_superuser, created, updated) FROM stdin;
1	pbkdf2_sha256$320000$yQm0Pxj9XVRTf2hs2hztmg$w7h55G75Pe/tnPZ14v3igNUgZ2gn/FAFaLG10Rv85pg=	\N	670a9147-d148-43cc-a5b4-efec5d80e478	john-doe	Joh 	doe	testuser@yopmail.com	t	f	2025-09-28 03:40:50.323977+01	2025-09-28 03:40:50.325273+01
\.


--
-- Data for Name: core_user_user_groups; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.core_user_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: core_user_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.core_user_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	core_user	user
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2025-09-27 15:19:05.898539+01
2	contenttypes	0002_remove_content_type_name	2025-09-27 15:19:05.920088+01
3	auth	0001_initial	2025-09-27 15:19:05.994528+01
4	auth	0002_alter_permission_name_max_length	2025-09-27 15:19:06.002347+01
5	auth	0003_alter_user_email_max_length	2025-09-27 15:19:06.007096+01
6	auth	0004_alter_user_username_opts	2025-09-27 15:19:06.012119+01
7	auth	0005_alter_user_last_login_null	2025-09-27 15:19:06.015827+01
8	auth	0006_require_contenttypes_0002	2025-09-27 15:19:06.017482+01
9	auth	0007_alter_validators_add_error_messages	2025-09-27 15:19:06.022243+01
10	auth	0008_alter_user_username_max_length	2025-09-27 15:19:06.026509+01
11	auth	0009_alter_user_last_name_max_length	2025-09-27 15:19:06.030582+01
12	auth	0010_alter_group_name_max_length	2025-09-27 15:19:06.065885+01
13	auth	0011_update_proxy_permissions	2025-09-27 15:19:06.071633+01
14	auth	0012_alter_user_first_name_max_length	2025-09-27 15:19:06.076672+01
15	core_user	0001_initial	2025-09-27 15:19:06.127337+01
16	admin	0001_initial	2025-09-27 15:19:06.154305+01
17	admin	0002_logentry_remove_auto_add	2025-09-27 15:19:06.172342+01
18	admin	0003_logentry_add_action_flag_choices	2025-09-27 15:19:06.177988+01
19	sessions	0001_initial	2025-09-27 15:19:06.195958+01
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: core
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 24, true);


--
-- Name: core_user_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.core_user_user_groups_id_seq', 1, false);


--
-- Name: core_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.core_user_user_id_seq', 1, true);


--
-- Name: core_user_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.core_user_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 6, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: core
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 19, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: core_user_user core_user_user_email_key; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user
    ADD CONSTRAINT core_user_user_email_key UNIQUE (email);


--
-- Name: core_user_user_groups core_user_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_groups
    ADD CONSTRAINT core_user_user_groups_pkey PRIMARY KEY (id);


--
-- Name: core_user_user_groups core_user_user_groups_user_id_group_id_ca80d112_uniq; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_groups
    ADD CONSTRAINT core_user_user_groups_user_id_group_id_ca80d112_uniq UNIQUE (user_id, group_id);


--
-- Name: core_user_user core_user_user_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user
    ADD CONSTRAINT core_user_user_pkey PRIMARY KEY (id);


--
-- Name: core_user_user core_user_user_public_id_key; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user
    ADD CONSTRAINT core_user_user_public_id_key UNIQUE (public_id);


--
-- Name: core_user_user_user_permissions core_user_user_user_perm_user_id_permission_id_5742740e_uniq; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_user_permissions
    ADD CONSTRAINT core_user_user_user_perm_user_id_permission_id_5742740e_uniq UNIQUE (user_id, permission_id);


--
-- Name: core_user_user_user_permissions core_user_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_user_permissions
    ADD CONSTRAINT core_user_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: core_user_user core_user_user_username_key; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user
    ADD CONSTRAINT core_user_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: core_user_user_email_3b5ca200_like; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_email_3b5ca200_like ON public.core_user_user USING btree (email varchar_pattern_ops);


--
-- Name: core_user_user_groups_group_id_2da02e74; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_groups_group_id_2da02e74 ON public.core_user_user_groups USING btree (group_id);


--
-- Name: core_user_user_groups_user_id_18e36d6f; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_groups_user_id_18e36d6f ON public.core_user_user_groups USING btree (user_id);


--
-- Name: core_user_user_user_permissions_permission_id_ed303843; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_user_permissions_permission_id_ed303843 ON public.core_user_user_user_permissions USING btree (permission_id);


--
-- Name: core_user_user_user_permissions_user_id_a4223031; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_user_permissions_user_id_a4223031 ON public.core_user_user_user_permissions USING btree (user_id);


--
-- Name: core_user_user_username_e1fbcfdb_like; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX core_user_user_username_e1fbcfdb_like ON public.core_user_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: core
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_groups core_user_user_groups_group_id_2da02e74_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_groups
    ADD CONSTRAINT core_user_user_groups_group_id_2da02e74_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_groups core_user_user_groups_user_id_18e36d6f_fk_core_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_groups
    ADD CONSTRAINT core_user_user_groups_user_id_18e36d6f_fk_core_user_user_id FOREIGN KEY (user_id) REFERENCES public.core_user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_user_permissions core_user_user_user__permission_id_ed303843_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_user_permissions
    ADD CONSTRAINT core_user_user_user__permission_id_ed303843_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_user_permissions core_user_user_user__user_id_a4223031_fk_core_user; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.core_user_user_user_permissions
    ADD CONSTRAINT core_user_user_user__user_id_a4223031_fk_core_user FOREIGN KEY (user_id) REFERENCES public.core_user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_core_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: core
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_core_user_user_id FOREIGN KEY (user_id) REFERENCES public.core_user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\unrestrict vTLKXctQOdR3PYxnbIr7Tgp7dTcKW40YzQcynZPLrcu3kSvlgOBjHymKOVsVSt2

