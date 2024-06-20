import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className="py-2 px-2 rounded-full text-center text-white bg-blue-500">
            <Link
              href={{
                pathname: '/regional',
              }}
            >
              Go to regional
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
