import { Check, House, Sprout } from 'lucide-react'

const serviceLayers = [
	{
		icon: House,
		name: 'Stay',
		description: 'Live-in house sitting, pet sitting and a trusted presence at your property while you are away.',
		bestFor: 'Extended trips and homes with pets',
	},
	{
		icon: Sprout,
		name: 'Care',
		description: 'Scheduled lawns, gardens, bins, mail, property checks and minor maintenance without a live-in stay.',
		bestFor: 'Regular upkeep and practical support',
	},
]

const longStayIncludes = [
	'Pet care',
	'House presence',
	'Mail and parcel collection',
	'Bins and plants',
	'Basic garden care',
	'Lawn mowing',
	'Visual property inspections',
	'Basic maintenance',
	"Coordination with the owner's tradespeople",
	'Smart-home monitoring',
]

export function ServiceList() {
	return (
		<section aria-labelledby="service-layers-heading">
			<h2 id="service-layers-heading" className="text-3xl font-bold [font-family:var(--font-mono)] sm:text-4xl">
				Choose the right level of support
			</h2>
			<div className="mt-8 grid gap-px overflow-hidden border border-base-content/10 bg-base-content/10 md:grid-cols-2">
				{serviceLayers.map(({ icon: Icon, name, description, bestFor }) => (
					<article id={name === 'Care' ? 'day-services' : undefined} key={name} className="scroll-mt-24 bg-base-100 p-7 sm:p-9">
						<Icon aria-hidden="true" className="size-7 text-primary" />
						<p className="mt-7 text-sm font-bold uppercase text-primary">Service layer</p>
						<h3 className="mt-2 text-3xl font-bold">{name}</h3>
						<p className="mt-4 max-w-xl text-lg leading-8 text-base-content/65">{description}</p>
						<p className="mt-7 border-t border-base-content/10 pt-5 text-sm font-semibold">{bestFor}</p>
					</article>
				))}
			</div>

			<article id="long-term-stays" className="mt-12 scroll-mt-24 border border-base-content/15 bg-base-100 p-7 sm:p-10">
				<div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
					<div>
						<p className="text-sm font-bold uppercase text-primary">2–12 weeks</p>
						<h3 className="mt-3 text-3xl font-bold [font-family:var(--font-mono)] sm:text-4xl">Long Stay House + Pet Care</h3>
						<p className="mt-5 text-lg leading-8 text-base-content/65">
							One dependable person looking after your pets, keeping your home lived-in and handling the practical details until you return.
						</p>
					</div>
					<div>
						<h4 className="text-sm font-bold uppercase">What is included</h4>
						<ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
							{longStayIncludes.map((item) => (
								<li key={item} className="flex items-start gap-3">
									<Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</article>
		</section>
	)
}
