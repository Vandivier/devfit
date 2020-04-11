import Head from 'next/head';

type DefaultHeadProps = {}

const DefaultHead: React.FC<DefaultHeadProps> = () => {
    return (
		<Head>
			<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
			<title>DevFit - do u even lift?</title>
		</Head>
	)
};
  
export default DefaultHead;