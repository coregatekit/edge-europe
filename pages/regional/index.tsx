import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

type Data = {
  ip?: string;
  sum: number;
  msg: string;
};

export const getServerSideProps = (async () => {
  const response = await fetch('https://edgeeurope.coregate.dev/api/ip');
  if (!response.ok) {
    const error = await response.json();
    return {
      props: { data: { msg: error.msg || 'Unknow error has occured!' } },
    };
  }
  return { props: { data: await response.json() } };
}) satisfies GetServerSideProps<{ data: Data }>;

export default function Regional({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className=" w-4/5 text-xl text-slate-700 font-bold">
            {data.msg}
          </div>
          <div>
            <p className="text-slate-700 text-lg">
              Your IP address is: {data.ip}
            </p>
            <p className="text-slate-700 text-lg">
              Sum of IP address is: {data.sum}
            </p>
            <div>
              <Link href="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
