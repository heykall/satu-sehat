import ButtonLink from "./ButtonLink";

const HeroSection = () => {
  return (
    <section className='flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-16'>
      <div className='flex sm:w-1/2 flex-col gap-1.5'>
        <h1 className='text-[28px] md:text-[52px] leading-snug font-semibold'>
          Solution for standardized your health services data
        </h1>
        <p className='font-light mb-5 sm:text-[20px] text-[#8C8C8C]'>
        A database adapter application that serves as a global data hub, connecting and streaming information between local databases and international FHIR standards.
        </p>
        <ButtonLink
          path='/'
          text='Get Started'
          width={'w-full sm:w-1/3'}
        />
      </div>
      <div className='w-full flex-1 h-full'>
        <img
          className='w-80 h-80 object-cover rounded-md shadow-md'
          src='https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/media/images/Contribute_Data.png'
          alt='hero-banner'
        />
      </div>
    </section>
  );
};

export default HeroSection;