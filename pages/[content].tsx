import type { GetStaticPaths, GetStaticProps, NextPage } from "next"

import Layout from "../components/Layout/Layout"
import Head from "next/head"
import { capitalizeRoute } from "../utils"
import { pages } from "../data/pages"

// Components
import Animations from "../components/ContentTemplates/AnimationsTemplate"
import Audio from "../components/ContentTemplates/AudioTemplate"
import Captchas from "../components/ContentTemplates/CaptchasTemplate"
import Charts from "../components/ContentTemplates/ChartsTemplate"
import Icons from "../components/ContentTemplates/IconsTemplate"
import Images from "../components/ContentTemplates/ImagesTemplate"
import Links from "../components/ContentTemplates/LinksTemplate"
import Video from "../components/ContentTemplates/VideoTemplate"

interface IProps {
	page: string
}

const ContentPage: NextPage = (props) => {
	const { page } = props as IProps
	const title = capitalizeRoute(page)

	return (
		<>
			<Head>
				<title>{`${title} - Accessible Web Dev`}</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<Layout headerTitle={title} activeNavLink={`/${page}`}>
				<>
					{page === "animations" && <Animations />}
					{page === "audio" && <Audio />}
					{page === "captchas" && <Captchas />}
					{page === "charts" && <Charts />}
					{page === "icons" && <Icons />}
					{page === "images" && <Images />}
					{page === "links" && <Links />}
					{page === "video" && <Video />}
				</>
			</Layout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = pages
		.filter((page) => page.content)
		.map((page) => ({
			params: { content: page.content },
		}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const content = context.params!.content

	return {
		props: {
			page: content,
		},
	}
}

export default ContentPage
