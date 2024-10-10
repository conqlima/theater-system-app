import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
    return (
        <div>
            <Skeleton height={200} width={200} />
            <Skeleton count={3} />
        </div>
    )
}